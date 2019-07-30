from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def home(request):
    return Response("Welcome to Call for Code!")

urlpatterns = [
    path('', home),
    path('auth/', include('auth_app.urls')),
    path('score/', include('disaster_score_app.urls')),
    path('sms/', include('twilio_app.urls')),
    path('image/', include('imagerec.urls')),
    path('med/', include('med_app.urls')),
    path('admin/', admin.site.urls)
]

