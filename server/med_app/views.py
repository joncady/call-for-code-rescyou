from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from auth_app.models import UserInfo
from .serializers import UserInfoSerializers
import json

@api_view(['GET'])
def get_users(request):
    params = request.GET
    blood_type = params.get('bloodtype', '')
    if request.user.is_authenticated:
        id = request.user.id
        users = UserInfo.objects.filter(medical_info__blood_type=blood_type).exclude(user_id=id)
        return Response(UserInfoSerializers(users, many=True).data)
    else:
        return Response(status=400)