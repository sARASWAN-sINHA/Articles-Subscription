from django.db import models


class Transaction(models.Model):
    razorpay_order_id = models.CharField(max_length=100)
    razorpay_payment_id = models.CharField(max_length=100)
    razorpay_signature = models.CharField(max_length=100)
    amount = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "transaction"
