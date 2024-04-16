from . import client
from rest_framework.exceptions import ValidationError
from rest_framework import status


class RazoprpayClient:
    def create_order(self, amount, currency):
        data = {
            "amount": amount * 100,
            "currency": currency,
        }
        try:
            order_data = client.order.create(data=data)
            return order_data
        except Exception as e:
            raise ValidationError(
                {
                    "message": "Invalid data!",
                    "detail": str(e),
                    "status": status.HTTP_400_BAD_REQUEST,
                }
            )

    def verify_payments(self, razorpay_order_id, razorpay_payment_id, razorpay_signature):
        try:
            
            return client.utility.verify_payment_signature(
                {
                    "razorpay_order_id": razorpay_order_id,
                    "razorpay_payment_id": razorpay_payment_id,
                    "razorpay_signature": razorpay_signature,
                }
            )
        except Exception as e:
            raise ValidationError(
                {
                    "message": "Invalid data!",
                    "detail": str(e),
                    "status": status.HTTP_400_BAD_REQUEST,
                }
            )
