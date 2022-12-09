from dateutil.relativedelta import relativedelta
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination

from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone
from accounts.models import GUser
from subscriptions.models import Subscription, Transaction
from subscriptions.serializers import SubscriptionSerializer, TransactionSerializer
from studios.models import ClassOccurrence

# Create your views here.

# options view get handler: pagination
class SubscriptionOptionsView(ListAPIView):
    """
    endpoint: /options/

    Purpose: List all the available descriptions, paginated
    """
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    # permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination # this should automatically paginate the request on a get request

class UserSubscriptionView(APIView):
    """
    endpoint: /my-subscription/

    Purpose: get the currently logged-in user's subscription
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):

        # check user auth
        # try:
        user = User.objects.get(username=request.user.username)
        guser = GUser.objects.get(user=user)

        user_sub = guser.subscription
        # check if user_sub does not exist
        if (user_sub == None):
            return Response({"subscription": "none"})
        return Response({"subscription": user_sub.type, "subscription_cost": user_sub.cost})
        # except:
        #     return Response({"error": "User not authorized"}, status=401)
class SubscribeView(APIView):
    """
    endpoint: /subscribe/
    
    Purpose: subscribe the currently logged in user to the subscription specified in the request body (type="monthly/yearly") and charge them immediately, 
                fails if the user is not logged in or the user is already subscribed to the requested plan
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None, **kwargs):

        # get the subscriptions
        subscriptions = Subscription.objects.all()

        # check user authorization
        try:
            user = User.objects.get(username=request.user.username)
            guser = GUser.objects.get(user=user)

            # check if the user has a card added
            if guser.payment_info == None:
                return Response({"error": "Please add payment information before subscribing"}, status=400)

            # get expiry date of the card
            card_expiry_list = str(guser.payment_info.cc_expiry).split("-")
            card_expiry_date = timezone.datetime(int(card_expiry_list[0]), int(card_expiry_list[1]), int(card_expiry_list[2])).date()
            card_expired = timezone.now().date() > card_expiry_date
            # check if the card is expired
            if card_expired:
                return Response({"error": "Your card has expired, please update your card info"}, status=400)

            # all transactions of the user
            transactions = Transaction.objects.filter(user=guser)
            
            # check response body
            if 'type' not in request.data:
                return Response({"error": "invalid request body"}, status=400)
            for request_key in request.data.keys():
                if request_key != "type":
                    return Response({"error": "invalid request body"}, status=400)
            if request.data['type'] != "monthly" and request.data['type'] != "yearly":
                return Response({"error": "invalid request body"}, status=400)

            new_subscription = subscriptions.get(type=request.data['type'])
            current_subscription = guser.subscription
            # check if the user is already subscribed to that plan
            if new_subscription == current_subscription:
                return Response({"error": "You are already subscribed to this plan"}, status=400)
            
            # create/updates new transactions (payments), first transaction is immediately after request is sent

            # UPDATE case:
            if current_subscription:
                # get the very next transaction
                first_payment = transactions.filter(timestamp__gt=timezone.now()).first();

                # delete all future transactions
                transactions.filter(timestamp__gt=timezone.now()).delete()
                # change the amount of the next transaction based on what the user wants to change it to
                first_payment.amount = new_subscription.cost
                # add transaction back to database
                Transaction.objects.create(user=guser, amount=first_payment.amount, timestamp=first_payment.timestamp)
                # update the user
                guser.transaction_set.add(first_payment)
                guser.save()
            
            # CREATE case: need to create a lot of new subscriptions
            elif new_subscription.type == "monthly":
                # create new transactions for the next 12 months
                for i in range(0, 12):
                    new_transaction = Transaction.objects.create(user=guser, amount=new_subscription.cost, timestamp=timezone.now()+relativedelta(months=i))
                    # store the first payment for a return
                    if i == 0:
                        first_payment = new_transaction
            elif new_subscription.type == "yearly":
                # create 2 new transactions, 1 for this year and 1 for the next year
                for i in range(0, 2):
                    new_transaction = Transaction.objects.create(user=guser, amount=new_subscription.cost, timestamp=timezone.now()+relativedelta(years=i))
                    if i == 0:
                        first_payment = new_transaction
            
            # set the user's subscription to the new one they requested
            guser.subscription = new_subscription
            guser.save()

            # return the first transaction as a response
            first_payment_serializer = TransactionSerializer(first_payment)
            return Response(first_payment_serializer.data)

        except:
            return Response({"error": "User not authorized"}, status=401)

class CancelSubscriptionsView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None, **kwargs):

        # try:
        user = User.objects.get(username=request.user.username)
        guser = GUser.objects.get(user=user)
        # all transactions of the user
        transactions = Transaction.objects.filter(user=guser)
        #future transactions
        future_payments = transactions.filter(timestamp__gt=timezone.now())

        # if there are classes for the user, then cancel all classes past the last payment time
        if guser.class_occurrences.all():
            # get the first class occurence of the user and get the date of the first class
            user_classes = guser.class_occurrences.all()
            # first_class = user_classes.order_by('start_datetime').first()
            # first_class_date = first_class.start_datetime
            
            # get next payment date
            next_payment = future_payments.order_by('timestamp').first()

            if (next_payment):
                # subtract one day from the last day so we get everything UP TO BUT NOT INCLUDING the last day (if a class is scheduled on the last day)
                next_payment_date = next_payment.timestamp - relativedelta(days=1) 

                # For every class that this user is in, we want to take them out of it
                for user_class in user_classes:
                    # We only modify classes that haven't occurred yet
                    if user_class.start_datetime > timezone.now() and user_class.start_datetime < next_payment_date:
                        # Remove this class from the user's schedule
                        guser.class_occurrences.remove(user_class)
                        
                        # Remove user from this class's attendance
                        user_class.num_attending -= 1;
                        user_class.save()    
            
            # get all the recurrences between the first class and the next payment date and set it to the user's occurences
            # guser.class_occurrences = guser.class_occurrences.all().recurrences.between(first_class_date, next_payment_date, dtstart=first_class_date, inc=True)
            guser.save()

        # delete current subscription
        current_subscription = guser.subscription
        # delete all future transactions if they exist
        if current_subscription:
            transactions.filter(timestamp__gte=timezone.now()).delete()
        else:
            # there is no current subscription, return an error
            return Response({"error": "User subscription doesn't exist"}, status=400)
        # set user's current subscription to None
        guser.subscription = None
        guser.save()


        return Response({'your subscription': guser.subscription})
        # except:
        #     return Response({"error": "User not authorized"}, status=401)
