import json
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import UserInfo, Address, MedicalInfo
from .forms import LoginForm, RegistrationForm


@api_view(['POST'])
def loginuser(request):
    form = json.loads(request.body.decode('utf-8'))
    user = authenticate(request, username=form["username"], password=form["password"])
    if user is not None:
        login(request, user)
        return Response(status=200, data={
            'id': user.pk,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        })
    else:
        return Response(status=403)


@api_view(['POST'])
def register(request):
    form = json.loads(request.body.decode('utf-8'))
    personal_info = form['personalInfo']
    contact_info = form['contactInfo']
    medical_info = form['medicalInfo']
    loginInfo = form['loginInfo']
    if loginInfo['password'] == loginInfo['confirmPassword']:
        username = loginInfo['email']
        email = loginInfo['email']
        password = loginInfo['password']
        first_name = personal_info['firstName']
        last_name = personal_info['lastName']
        phone_number = contact_info['phoneNo']
        birthdate = personal_info['birthdate']
        address = contact_info['address']
        user = User.objects.create_user(username, email, password, first_name=first_name,
                                        last_name=last_name)
        address_entity = Address(
            line1=address['addressLine1'], line2=address['addressLine2'], city=address['city'], state=address['state'], postal_code=address['postalCode'])
        address_entity.save()
        medical_entity = MedicalInfo(
            allergies=medical_info['allergies'], blood_type=medical_info['bloodType'], blood_donor=medical_info['bloodDonor'], organ_donor=medical_info['organDonor'], medications=medical_info['medications'])
        medical_entity.save()
        user_info = UserInfo(
            user=user, phone_number=phone_number, birthdate=birthdate, address=address_entity, medical_info=medical_entity)
        user_info.save()
        login(request._request, user)
        return Response(status=204)
    else:
        return Response(status=400)


@api_view(['GET'])
def logoutuser(request):
    logout(request)
    return Response(status=203)


@api_view(['GET'])
def test_user(request):
    user = request.user
    if user and user.is_authenticated:
        return Response({
            'id': user.pk,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        })
    else:
        return Response(status=403)
