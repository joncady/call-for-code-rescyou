from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, UserManager
from imagerec.models import ImagesSet
from twilio_app.models import ContactsList


class Address(models.Model):
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=2)
    postal_code = models.BigIntegerField()


class MedicalInfo(models.Model):
    allergies = models.CharField(max_length=255)
    blood_donor = models.BooleanField()
    blood_type = models.CharField(max_length=3)
    medications = models.CharField(max_length=255)
    organ_donor = models.BooleanField()


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.TextField()
    birthdate = models.DateField()
    address = models.ForeignKey('Address', null=True, on_delete=models.SET_NULL)
    medical_info = models.ForeignKey('MedicalInfo', null=True, on_delete=models.SET_NULL)
    images_set = models.ForeignKey(ImagesSet, null=True, on_delete=models.SET_NULL)
    contacts = models.ForeignKey(ContactsList, null=True, on_delete=models.SET_NULL)
