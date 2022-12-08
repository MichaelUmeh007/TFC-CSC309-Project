from django.urls import path

from subscriptions.views import CancelSubscriptionsView, SubscribeView, SubscriptionOptionsView, UserSubscriptionView

app_name = 'subscriptions'

urlpatterns = [
    path('options/', SubscriptionOptionsView.as_view(), name="options"),
    path('my-subscription/', UserSubscriptionView.as_view(), name="my-sub"),
    path('subscribe/', SubscribeView.as_view(), name="subscribe"),
    path('cancel/', CancelSubscriptionsView.as_view(), name="cancel")

]