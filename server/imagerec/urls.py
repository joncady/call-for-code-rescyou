from django.urls import path
from .views import classify_image, upload_before, upload_after, get_all_images

urlpatterns = [
    path('classify', classify_image, name="classify"),
    path('before', upload_before, name="before"),
    path('after', upload_after, name="after"),
    path('getall', get_all_images, name='getall')
]