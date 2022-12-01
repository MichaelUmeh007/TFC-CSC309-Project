from rest_framework import serializers

from subscriptions.models import Subscription, Transaction

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['type', 'cost']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['amount', 'timestamp']