from django.urls import path
from .views import disaster_score_service

urlpatterns = [
    path('getscore', disaster_score_service, name="getscore"),
]