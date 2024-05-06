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
    

    '''
    For future additions:- 
        1. Create a screen to show users about their previous subscriptions that they had purchased.
        2. Out of all the  previous subscriptions that a user had purchased, I might want only the last subscription.   

    '''

    @action(detail=False, methods=["GET"], url_path="user-subscription-history")
    def user_subscription_history(self, request, *args, **kwargs):
        user = request.user
        past_subscription_records = user.subscription_history()
        serialized_data = self.serializer_class(past_subscription_records, many=True)
        return Response(
                {
                    "message": "Previous subscription data",
                    "data": serialized_data.data
                },
                status=status.HTTP_200_OK
        )
    @action(detail=False, methods=["GET"], url_path="user-lastest-subscription")
    def user_lastest_subscription(self, request, *args, **kwargs):
        user = request.user
        last_subscription = user.latest_subscription()
        serialized_data = self.serializer_class(last_subscription)
        return Response(
            {
                "message": "Latest scubscription found!",
                "data":   serialized_data.data,
            },
            status=status.HTTP_200_OK
        )

