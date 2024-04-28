from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action


from .models import Subscription
from .serializers import SubscriptionSerializer

class SubscriptionViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = Subscription.objects.all()
    serializer_class =  SubscriptionSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    

    @action(detail=False, methods=["GET"], url_path="user-previous-subscription")
    def user_previous_subscription(self, request, *args, **kwargs):
        user = request.user
        data = None
        if self.queryset.filter(subscriber=user).exists():
            data = self.queryset.filter(subscriber=user)
            serialized_data = self.serializer_class(data, many=True)
            return Response(
                {
                    "message":"Found prevoius subscription.",
                    "data":serialized_data.data
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "message": "No previous subscription found.",
                    "data":{}
                },
                status=status.HTTP_200_OK
            )


            


    @action(detail=False, methods=["PATCH"], url_path="deactivate-subscription")
    def deactivate_subscription(self, request, *args, **kwargs):
        subscription = request.user.subscription
        data         = {"is_active": False}
        request.user.subscription = None

        serialized_subscription = self.serializer_class(instance=subscription, data=data, partial=True)
        serialized_subscription.is_valid(raise_exception=True)
        serialized_subscription.save()
        return Response(
            {
                "data": serialized_subscription.data,
                "message": "Subscription de-activated",
            },
            status=status.HTTP_200_OK,
        )
