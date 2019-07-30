from django.urls import path
from .views import loginuser, register, logoutuser, test_user

urlpatterns = [
    path('logout', logoutuser, name="logout"),
    path('register', register, name="register"),
    path('login', loginuser, name="login"),
    path('currentuser', test_user, name="currentuser")    
]