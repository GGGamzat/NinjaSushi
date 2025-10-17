from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone_number', 'email', 'username', 'date_joined')
        read_only_fields = ('id', 'phone_number', 'date_joined')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone_number', 'email', 'username', 'date_joined')
        read_only_fields = ('id', 'phone_number', 'date_joined')

class PhoneNumberSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

class VerificationCodeSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)