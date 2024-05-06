from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth.models import Group

from rest_framework import serializers

from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ["type", "cost", "is_active", "subscriber"]


class CustomUserSerializer(UserSerializer):
    subscription = SubscriptionSerializer(many=True, read_only=True)

    class Meta(UserSerializer.Meta):
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "is_writer",
            "joined_on",
            "subscription",
        )
        # read_only_fields = ('email', 'first_name', 'last_name', 'is_writer',)

    def to_representation(self, instance):

        user = super().to_representation(instance)
        user_subscriptions = user.get("subscription", None)
        for user_subscription in user_subscriptions:
            user_subscription.pop("cost")
            user_subscription.pop("subscriber")
        return user


class CustomUserCreateSerializer(UserCreateSerializer):

    def create(self, validated_data):
        user = super().create(validated_data)
        is_writer_flag = validated_data.get("is_writer")

        user_group = (
            Group.objects.get(name="Writer")
            if is_writer_flag == True
            else Group.objects.get(name="Client")
        )
        user_group.user_set.add(user)

        return user

    class Meta(UserCreateSerializer.Meta):
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
            "is_writer",
            "joined_on",
        )
        extra_kwargs = {
            "last_name": {"required": False, "allow_null": True},
        }
