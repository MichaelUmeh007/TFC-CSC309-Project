
from django.shortcuts import render
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from subscriptions.serializers import TransactionSerializer
from subscriptions.models import Transaction
from django.utils import timezone


from accounts.models import GUser
from studios.models import ClassOccurrence
from studios.serializers import ClassOccurrenceSerializer
from accounts.serializers import GUserSerializer, ProfileSerializer, PaymentSerializer
from accounts.paginators import StandardResultsSetPagination, ScheduleResultsSetPagination



# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = GUserSerializer 

class LoginView(APIView):
    ...

class LogoutView(APIView):
    ...

class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = GUser.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    

    def retrieve(self, request, *args, **kwargs):
        gazer = get_object_or_404(GUser, user=request.user)
        serializer = self.get_serializer(gazer)
        return Response(serializer.data)


    def partial_update(self, request, *args, **kwargs):
        gazer = get_object_or_404(GUser, user=request.user)
        data = {}
        for key in request.data.keys():
            data[key] = request.data[key]
        serializer = self.get_serializer(gazer, data=data, partial=True)
        if serializer.is_valid() == False:
            return Response(serializer.errors)
        serializer.save()
        return Response(serializer.data)



class ClassesProfileView(generics.ListAPIView):
    model = ClassOccurrence
    serializer_class = ClassOccurrenceSerializer
    pagination_class = ScheduleResultsSetPagination
    
    def get_queryset(self, *args, **kwargs):
        gazer = get_object_or_404(GUser, user=self.request.user)
        return gazer.class_occurrences.all()
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset = queryset.order_by('start_datetime')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    """
    Basic GET Method to test 
    """

class PaymentHistoryView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None, **kwargs):

        # user auth
        try:
            user = User.objects.get(username=request.user.username)
            guser = GUser.objects.get(user=user)
            # all transactions of the user
            transactions = Transaction.objects.filter(user=guser)

            # get payment history
            payment_history = transactions.filter(timestamp__lte=timezone.now())
            history_dict = payment_history.values('amount', 'timestamp')

            # get next payment
            future_payments = transactions.filter(timestamp__gt=timezone.now())
            next_payment = future_payments.order_by('timestamp').first()
            next_payment_serializer = TransactionSerializer(next_payment)

            
            # return the next payment and the next payment
            return Response({'payment_history': history_dict, 'next_payment': next_payment_serializer.data})
            
        except:
            return Response({"error": "User not authorized"}, status=401)
    
class ProfilePaymentView(generics.RetrieveUpdateAPIView):
    queryset = GUser.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        gazer = get_object_or_404(GUser, user=request.user)
        serializer = self.get_serializer(gazer)
        return Response(serializer.data)
    
    def partial_update(self, request, *args, **kwargs):
        gazer = get_object_or_404(GUser, user=request.user)
        data = {}
        for key in request.data.keys():
            data[key] = request.data[key]
        serializer = self.get_serializer(gazer, data=data, partial=True)
        if serializer.is_valid() == False:
            return Response(serializer.errors)
        serializer.save()
        print(gazer.payment_info.cc_number)
        return Response(serializer.data)
