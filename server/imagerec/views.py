from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from watson_developer_cloud import VisualRecognitionV3
from .models import ImagePair, ImagesSet
from auth_app.models import UserInfo
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from .image_client import upload
import os
from .serializers import ImagePairSerializer

STORAGE_URL = '<storage-url>'

visual_recognition = VisualRecognitionV3(
    '2018-03-19',
    iam_apikey='<api-key>'
)

def classify_image(url):
    classes_result = visual_recognition.classify(url=url).get_result()
    return classes_result

@csrf_exempt
def upload_before(request):
    data = json.loads(request.body.decode('utf-8'))
    image_pairs = data.get('imagePairs', '')
    image_array = []
    if not request.user.is_authenticated:
        return Response(status=400)
    if image_pairs is not None:
        for single_image in image_pairs:
            before = single_image.get('beforeImg', '')
            filename = upload(before)
            image_pair = ImagePair(title=single_image.get('title', ''), comments=single_image.get('comments'), before=STORAGE_URL + filename)
            image_array.append(image_pair)
        images_set = ImagesSet(image_pairs=image_array)
        images_set.save()
        id = request.user.id
        user_info = UserInfo.objects.get(user_id=id)
        user_info.images_set = images_set
        user_info.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


@csrf_exempt
def upload_after(request):
    data = json.loads(request.body.decode('utf-8'))
    image_pairs = data.get('imagePairs', '')
    if not request.user.is_authenticated:
        return Response(status=400)
    id = request.user.id
    user_info = UserInfo.objects.get(user_id=id)
    classification = []
    if image_pairs is not None:
        images_set = user_info.images_set
        image_set_array = images_set.image_pairs
        for num, image in enumerate(image_set_array):
            single_image = image_pairs[num]
            image_entity = single_image.get('img', '')
            filename = STORAGE_URL + upload(image_entity)
            image.set_after(filename)
            classification_1 = classify_image(image.before)
            classification_2 = classify_image(filename)
            classification.append({ 'score1': classification_1, 'score2': classification_2 })
        images_set.image_pairs = image_set_array
        images_set.save()
        user_info.images_set = images_set
        user_info.save()
        return HttpResponse(classification)
    else:
        return HttpResponse(status=400)


@csrf_exempt
def upload_both(request):
    data = json.loads(request.body.decode('utf-8'))
    image_pairs = data.get('imagePairs', '')
    image_array = []
    if not request.user.is_authenticated:
        return Response(status=400)
    if image_pairs is not None:
        for single_image in image_pairs:
            image_before = single_image.get('beforeImg', '')
            image_before_url = STORAGE_URL + upload(image_before)
            image_after = single_image.get('afterImg', '')
            image_after_url = STORAGE_URL + upload(image_after)
            image_pair = ImagePair(title=single_image.get('title', ''), comments=single_image.get('comments'), before=image_before_url, after=image_after_url)
            image_array.append(image_pair)
        images_set = ImagesSet(image_pairs=image_array)
        images_set.save()
        id = request.user.id
        user_info = UserInfo.objects.get(user_id=id)
        user_info.images_set = images_set
        user_info.save()
        # do classification here, maybe return?
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


@api_view(["GET"])
def get_all_images(request):
    if not request.user.is_authenticated:
        return Response(status=400)
    id = request.user.id
    user_info = UserInfo.objects.get(user_id=id)
    image_set = user_info.images_set
    if image_set is not None:
        image_pairs = image_set.image_pairs
        return Response(ImagePairSerializer(image_pairs, many=True).data)
    else:
        return Response([])