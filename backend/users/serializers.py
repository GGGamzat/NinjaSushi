from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "phone", "password")

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            phone=validated_data["phone"],
            password=validated_data["password"]
        )


class PhoneTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["phone"] = user.phone
        return token

    def validate(self, attrs):
        # заменяем email на phone
        phone = attrs.get("phone")
        password = attrs.get("password")

        user = User.objects.filter(phone=phone).first()
        if user and user.check_password(password):
            return super().validate({"phone": phone, "password": password})
        raise serializers.ValidationError("Неверный номер телефона или пароль")
