from django.contrib import admin

from .models import UserInfo, MedicalInfo, Address

admin.site.register(UserInfo)
admin.site.register(Address)
admin.site.register(MedicalInfo)
