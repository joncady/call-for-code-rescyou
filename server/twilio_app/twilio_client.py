from django.db import models
import requests as r
from rest_framework.response import Response

client_url = "http://test.com:8080"

def login_user(username, password):
    payload = {'username': username, 'password': password}
    result = r.post(client_url + "/login", data=payload)
    data = result.json()
    return Response(data)

def logout_user(self, token):
    payload = {'token': token}
    result = r.post(client_url + "/logout", data=payload)
    data = result.json()
    return Response(data)

def add_user(username, password, email):
    payload = {'username': username, 'password': password, 'email': email}
    result = r.post(client_url + "/adduser", data=payload)
    data = result.json()
    return Response(data)

def add_phone(token, phone):
    payload = {'token': token, 'phone': phone}
    result = r.post(client_url + "/addphone", data=payload)
    data = result.json()
    return Response(data)

def get_user(token, user):
    payload = {'token': token, 'user': user}
    result = r.post(client_url + "/getuser", data=payload)
    data = result.json()
    return Response(data)