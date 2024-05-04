from django.contrib import admin

from account.models import CustomUser, Subscription


class SubscriptionAdmin(admin.ModelAdmin):
    list_display = (
        "type",
        "cost",
        "subscriber",
        "subscribed_on",
        "subscribed_to",
        "is_active",
    )
    readonly_fields = ("type", "cost", "is_active", "subscribed_on", "subscribed_to")

    def __str__(self) -> str:
        return f'{self.subscriber.first_name + " " + self.subscriber.last_name} - {self.type}'


# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Subscription, SubscriptionAdmin)
