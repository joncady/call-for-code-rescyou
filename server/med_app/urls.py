from django.urls import path
from .views import get_users

urlpatterns = [
    path('bloodtype', get_users, name="bloodtype") 
]