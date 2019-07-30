from django.shortcuts import render
from .twilio_client import login_user, logout_user, add_user, add_phone, get_user
from .forms import LoginForm
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ContactSerializer
from auth_app.models import UserInfo
from .models import Contact, ContactsList
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


@api_view(['POST'])
def login_service(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        return login_user(form.cleaned_data['username'], form.cleaned_data['password'])
    else:
        return Response("Login Failed")

@api_view(['POST'])
def logout_service(request):
    form = request.POST
    token = form.get('token')
    return logout_user(token)

@api_view(['POST'])
def add_phone_service(request):
    form = request.POST
    token = form.get('token')
    phone = form.get('phone')
    return add_phone(token, phone)

@api_view(['POST'])
def add_user_service(request):
    form = request.POST
    username = form.get('username')
    password = form.get('password')
    email = form.get('email')
    return add_user(username, password, email)

@api_view(['POST'])
def get_user_service(request):
    form = request.POST
    token = form.get('token')
    user = form.get('user')
    return get_user(token, user)

@api_view(['GET'])
def get_contacts(request):
    if not request.user.is_authenticated:
        return Response(status=400)
    id = request.user.id
    user_info = UserInfo.objects.get(user_id=id)
    contacts = user_info.contacts
    if contacts is not None:
        return Response(ContactSerializer(contacts.contacts, many=True).data)
    return Response([])


@csrf_exempt
def post_contacts(request):
    if not request.user.is_authenticated:
        return Response(status=400)
    id = request.user.id
    user_info = UserInfo.objects.get(user_id=id)
    form = json.loads(request.body.decode('utf-8'))
    contacts_list = form.get('contacts', '')
    contacts = user_info.contacts
    if contacts is None:
        contacts = []
    else:
        contacts = contacts.contacts
    for contact in contacts_list:
        contact_entity = Contact(name=contact.get('name', ''), number=contact.get('number', ''))
        contacts.append(contact_entity)
    contacts_entity = ContactsList(contacts=contacts)
    contacts_entity.save()
    user_info.contacts = contacts_entity
    user_info.save()
    return HttpResponse(status=200)