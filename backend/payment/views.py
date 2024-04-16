from rest_framework import views, generics, viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .models import Transaction

from .services import RazoprpayClient
from .serializers import (
    OrderCreateSerializer,
    TransactionSerializer,
    VerifyPaymentSerialzer,
)


rz_cleint = RazoprpayClient()


class CreateOrderView(views.APIView):
    def post(self, request):
        data = request.data

        order_create_data = OrderCreateSerializer(data=data)
        order_create_data.is_valid(raise_exception=True)

        order = rz_cleint.create_order(**order_create_data.validated_data)
        return Response(
            {
                "detail": "Order created successfully!!",
                "status": status.HTTP_201_CREATED,
                "data": order,
            }
        )


class TransactionViewSet(viewsets.GenericViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def create(self, request, *args, **kwargs):
        serialized_transaction_data = self.serializer_class(data=request.data)
        serialized_transaction_data.is_valid(raise_exception=True)
        serialized_transaction_data.save()
        return Response(
            {
                "details": "Transaction saved successfully!",
                "status": status.HTTP_201_CREATED,
            }
        )

    @action(detail=False, methods=["POST"])
    def verify_payment(self, request):
        serialized_request_data = VerifyPaymentSerialzer(data=request.data)
        serialized_request_data.is_valid(raise_exception=True)
        response = {"status": status.HTTP_200_OK}
        if rz_cleint.verify_payments(**serialized_request_data.validated_data):
            response["details"] = "Verified successfully!"
            response["data"] = True
        else:
            response["details"] = "Verification failed!"
            response["data"] = False

        return Response(response)
