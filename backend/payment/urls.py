from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CreateOrderView, TransactionViewSet

router = DefaultRouter(trailing_slash=False)
router.register("transaction", TransactionViewSet, basename="transaction-api")
urlpatterns = [
    path("order", CreateOrderView.as_view(), name="create-order-api"),
    path("", include(router.urls) ),
]
