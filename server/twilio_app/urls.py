from django.urls import path
from .views import login_service, logout_service, add_phone_service, add_user_service, get_user_service, get_contacts, post_contacts

urlpatterns = [
    path('login', login_service, name="login"),
    path('logout', logout_service, name="logout"),
    path('adduser', add_user_service, name="adduser"),
    path('addphone', add_phone_service, name="addphone"),
    path('getuser', get_user_service, name="getuser"),
    path('getcontacts', get_contacts, name="getcontacts"),
    path('postcontacts', post_contacts, name="postcontacts") 
]