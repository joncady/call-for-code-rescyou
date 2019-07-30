from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField()
    number = serializers.CharField()