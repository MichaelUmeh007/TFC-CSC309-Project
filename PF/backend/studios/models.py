from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from recurrence.fields import RecurrenceField
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from accounts.validators import validate_international_phonenumber

import datetime

# Create your models here.

# Regex Validator for Canadian Postal Codes 
# Source: https://stackoverflow.com/questions/29906947/canadian-postal-code-validation-python-regex
postal_code = RegexValidator(r'\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s\d[ABCEGHJ-NPRSTV-Z]\d\b', )

class Studio(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    # Maybe we get rid of these and geocode the address
    latitude = models.DecimalField(max_digits=8, decimal_places=6, validators=[MaxValueValidator(90), MinValueValidator(-90)])         # part of geographical location
    longitude = models.DecimalField(max_digits=9, decimal_places=6, validators=[MaxValueValidator(180), MinValueValidator(-180)])        # part of geographical
    postal_code = models.CharField(max_length=7, validators=[postal_code])                               # is length an attribute? or only max_length/min_length
    phone_number = models.CharField(max_length=255, null=False, blank=False, unique=True, validators=[validate_international_phonenumber])

    def __str__(self):
        return self.name

class Image(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)
    images = models.ImageField(upload_to="images/") 
        
class Amenity(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='amenities')
    type = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()

    class Meta:
        verbose_name_plural = "Amenities"

    def __str__(self):
        return self.type

class Class(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    coach = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField()
    # Beginning of time details
    start_datetime = models.DateTimeField(null=True)    # I think Recurrence Field takes care of this - it handles date at least, so worst case we make this time
    end_datetime = models.DateTimeField(null=True)      # I think Recurrence Field takes care of this - same as above
    duration = models.DurationField(default=datetime.timedelta(hours=3)) # Recurence field might handle this
    is_recurring = models.BooleanField(default=True)
    recurrences = RecurrenceField(null=True)

    class Meta:
        verbose_name_plural = "Classes"
    
    def __str__(self):
        return self.name

# We make a class occurrence model to keep track of individual classes for a type of Class
class ClassOccurrence(models.Model):
    parent_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    # Switch these to one date field if it doens't have the time (we can get the time from parent_class)
    start_datetime = models.DateTimeField(null=True)
    end_datetime = models.DateTimeField(null=True)
    num_attending = models.PositiveIntegerField(null=True)  # This should never be more than capacity in parent_class

class Keyword(models.Model):
    ex_class = models.ForeignKey(Studio, on_delete=models.CASCADE)
    word = models.CharField(max_length=255)

    def __str__(self):
        return self.type