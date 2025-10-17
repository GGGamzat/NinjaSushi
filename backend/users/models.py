from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator


class UserManager(BaseUserManager):
    def _create_user(self, phone_number, **extra_fields):
        if not phone_number:
            raise ValueError('Phone number must be set')

        if not extra_fields.get('username'):
            last_user = User.objects.order_by('-id').first()
            new_id = last_user.id + 1 if last_user else 1
            extra_fields['username'] = f'user{new_id}'

        user = self.model(phone_number=phone_number, **extra_fields)
        user.save(using=self._db)
        return user
    
    def create_user(self, phone_number, **extra_fields):
        return self_create_user()

    def create_superuser(self, phone_number, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(phone_number, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(blank=True, null=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELD = []

    def __str__(self):
        return self.phone_number