from rest_framework import serializers

class ImagePairSerializer(serializers.Serializer):
    title = serializers.CharField()
    before = serializers.CharField()
    comments = serializers.CharField()
    after = serializers.CharField()