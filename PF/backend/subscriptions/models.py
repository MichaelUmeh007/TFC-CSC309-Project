from django.db import models

# Create your models here.
class Subscription(models.Model):
    # ForeignKey to Subscription exists in User
    type = models.CharField(max_length=255)
    cost = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.type

from accounts.models import GUser

class Transaction(models.Model):
    user = models.ForeignKey(to=GUser, on_delete=models.CASCADE, null=True)
    # payment_info = models.OneToOneField(to=PaymentInfo, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    timestamp = models.DateTimeField()

    # def __str__(self):
    #     return self.user.username + ": " + self.amount + " at " + self.timestamp 
