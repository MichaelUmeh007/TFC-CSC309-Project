from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import GUser, Avatar, PaymentInfo
from geopy.geocoders import Nominatim
import geopy.geocoders
import certifi
import ssl
from rest_framework.validators import UniqueValidator
from accounts.validators import validate_international_phonenumber, validate_security_code, validate_credit_card
from creditcards.validators import CCNumberValidator, ExpiryDateValidator, CSCValidator

class GUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", validators=[UniqueValidator(queryset=User.objects.all())])
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.EmailField(source="user.email")
    password = serializers.CharField(source="user.password")
    phone_number = serializers.CharField(validators=[validate_international_phonenumber, UniqueValidator(queryset=GUser.objects.all().values("phone_number"))])
    address = serializers.CharField()


    class Meta:
        model = GUser
        # Should we display the user's password - STATUS: it breaks if we don't lmao
        # Potential change, postal_code instead of address
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'address', 'phone_number']

    
    # Probably won't need create and update function b/c admin will handle that
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(username=user_data['username'], first_name=user_data['first_name'], 
                                    last_name=user_data['last_name'], email=user_data['email'], password=user_data['password'])

        # If this doesn't work, make a guser_data dictionary
        return GUser.objects.create(user=user, address=validated_data['address'], phone_number=validated_data['phone_number'])

    def validate_address(self, value):
        """
        Check that the given address is a valid address.
        """
        
        ctx = ssl.create_default_context(cafile=certifi.where())
        geopy.geocoders.options.default_ssl_context = ctx
        geolocator = Nominatim(user_agent="accounts")
        try:
            location = geolocator.geocode(value, exactly_one=True, timeout=15)
            if location is None:
                raise serializers.ValidationError("This address, {}, could not be found.".format(value))
        except:
            raise serializers.ValidationError("This address, {}, could not be found. Location services may be temporarily unavailable.".format(value))
        return value


class ProfileSerializer(serializers.Serializer):
    
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.EmailField(source="user.email")
    phone_number = serializers.CharField(allow_null=True, validators=[validate_international_phonenumber, UniqueValidator(queryset=GUser.objects.all().values("phone_number"))])
    avatar = serializers.ImageField(source="avatar.image", max_length=None, allow_empty_file=True, allow_null=True)

    def update(self, instance, validated_data):
        if validated_data.get('user'):
            for key in validated_data.get('user'):
                setattr(instance.user, key, validated_data.get('user')[key])
            instance.user.save()

        instance.phone_number = validated_data.get('phone_number', instance.phone_number)

        if validated_data.get('avatar'):
            av = Avatar(image=(validated_data.get('avatar'))["image"])
            av.save()
            instance.avatar = av
        instance.save()
        return instance

class PaymentSerializer(serializers.Serializer):
    cc_number = serializers.CharField(allow_null=True, source="payment_info.cc_number", validators=[validate_credit_card])
    cc_expiry = serializers.DateField(allow_null=True, source="payment_info.cc_expiry", validators=[ExpiryDateValidator])
    cc_code = serializers.CharField(allow_null=True, source="payment_info.cc_code", validators=[validate_security_code])

    def update(self, instance, validated_data):
        if instance.payment_info is not None:
            if validated_data.get('payment_info'):
                for key in validated_data.get('payment_info'):
                    setattr(instance.payment_info, key, validated_data.get('payment_info')[key])
                instance.payment_info.save()
        else:
            if validated_data.get('payment_info'):
                payment = PaymentInfo()
                for key in validated_data.get('payment_info'):
                    setattr(payment, key, validated_data.get('payment_info')[key])
                payment.save()
                instance.payment_info = payment
        
        instance.save()
        return instance