from django.utils import timezone
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from .managers import CustomUserManager
from django.contrib.auth.models import PermissionsMixin
from datetime import timedelta, datetime


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


    def subscription_history(self):
        return self.subscription.all()
    
    def latest_subscription(self):
        return self.subscription.last()
    
    def deactivate_subscription(self):
        last_subscription = self.latest_subscription()
        last_subscription.is_active = False
        return last_subscription


class Subscription(models.Model):
    class SubscriptionTypes(models.TextChoices):
        NONE     = "None"   , "None"
        STANDARD = "STD"    , "Standard"
        PREMIUM  = "PRM"    , "Premium"
    
    type            = models.CharField(max_length=100, db_column="type", choices=SubscriptionTypes)
    cost            = models.FloatField(db_column="cost")
    subscriber      = models.ForeignKey(to=CustomUser, related_name="subscription", on_delete=models.CASCADE)
    subscribed_on   = models.DateTimeField(auto_now_add=True, null=True)

    @property
    def subscribed_to(self):
        subscribed_to =  self.subscribed_on + timedelta(days=90)
        return subscribed_to
    
    @property
    def is_active(self):
        subscribed_to = self.subscribed_on + timedelta(seconds=90)
        return subscribed_to > timezone.now()

    def __str__(self) -> str:
        return f'{self.subscriber.first_name + " " + self.subscriber.last_name} - {self.type}' 