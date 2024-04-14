from rest_framework import serializers

from .models import Transaction


class OrderCreateSerializer(serializers.Serializer):
    amount = serializers.FloatField()
    currency = serializers.CharField(max_length=10)


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            "razorpay_order_id",
            "razorpay_payment_id",
            "razorpay_signature",
            "amount",
        ]


class VerifyPaymentSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            "razorpay_order_id",
            "razorpay_payment_id",
            "razorpay_signature",
        ]
