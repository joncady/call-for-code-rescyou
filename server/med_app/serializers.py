from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()


class MedicalInfoSerializer(serializers.Serializer):
    blood_type = serializers.CharField()
    blood_donor = serializers.BooleanField()
    organ_donor = serializers.BooleanField()


class UserInfoSerializers(serializers.Serializer):
    user = UserSerializer()
    medical_info = MedicalInfoSerializer()
    phone_number = serializers.CharField()




    
