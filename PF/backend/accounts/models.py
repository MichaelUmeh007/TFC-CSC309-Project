from django.db import models
from django.contrib.auth.models import AbstractUser
from accounts.validators import validate_international_phonenumber
from studios.models import Class
from phonenumber_field.modelfields import PhoneNumberField
from studios.models import Class, ClassOccurrence
from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
from django.contrib.auth.models import User
from subscriptions.models import Subscription 

class PaymentInfo(models.Model):
    cc_number = CardNumberField()
    cc_expiry = CardExpiryField()
    cc_code = SecurityCodeField()

class Avatar(models.Model):
    image = models.ImageField(upload_to="images/", null=True, blank=True) 

class GUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.OneToOneField(to=Avatar, null=True, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=255, null=True, blank=True, unique=True, validators=[validate_international_phonenumber])
    classes = models.ManyToManyField(to=Class)    # Not sure about restrict
    class_occurrences = models.ManyToManyField(to=ClassOccurrence)
    payment_info = models.OneToOneField(to=PaymentInfo, null=True, on_delete=models.CASCADE)
    subscription = models.ForeignKey(to=Subscription, null=True, on_delete=models.CASCADE)
    address = models.CharField(max_length=255, default="100 Queen St W, Toronto, ON")      # Will need to validate this

