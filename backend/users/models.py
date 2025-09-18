from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex=r'^\+7\d{10}$',
    message="Номер телефона должен начинаться с +7 и содержать 11 цифр"
)

class UserManager(BaseUserManager):
    def create_user(self, username, email, phone, password=None):
        if not email:
            raise ValueError("У пользователя должна быть почта")
        if not phone:
            raise ValueError("У пользователя должен быть телефон")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, phone=phone)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, phone, password=None):
        user = self.create_user(username, email, phone, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=12, unique=True, validators=[phone_validator])
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "phone"   # вход через номер телефона
    REQUIRED_FIELDS = ["username", "email"]

    def __str__(self):
        return self.phone
