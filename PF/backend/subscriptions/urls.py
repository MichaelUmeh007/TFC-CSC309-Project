from django.urls import path

from subscriptions.views import CancelSubscriptionsView, SubscribeView, SubscriptionOptionsView

app_name = 'subscriptions'

urlpatterns = [
    path('options/', SubscriptionOptionsView.as_view(), name="options"),
    path('subscribe/', SubscribeView.as_view(), name="subscribe"),
    path('cancel/', CancelSubscriptionsView.as_view(), name="cancel")

]