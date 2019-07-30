import json
from django.shortcuts import render
from .disaster_score_client import get_score
from rest_framework.decorators import api_view


@api_view(['POST'])
def disaster_score_service(request):
    data = json.loads(request.body.decode('utf-8'))
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    disaster_type = data.get('type')
    return get_score(latitude, longitude, disaster_type)