from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import SubscriptionViewSet

router = DefaultRouter(trailing_slash = False)
router.register("subscription", SubscriptionViewSet, basename="subscription-api")

urlpatterns = [
    path("", include(router.urls))
]

