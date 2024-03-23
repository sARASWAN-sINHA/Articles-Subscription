from django.utils import timezone
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from .managers import CustomUserManager
from django.contrib.auth.models import PermissionsMixin


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username        = None
    email           = models.CharField(unique=True, max_length=80)
    password        = models.CharField(max_length=80)
    first_name      = models.CharField(max_length=80)
    last_name       = models.CharField(max_length=80, null=True, blank=True)
    is_writer       = models.BooleanField(default=False)

    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)

    joined_on       = models.DateTimeField(default = timezone.now)

    objects         =  CustomUserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = [] #for superuser creation only; not regular user
