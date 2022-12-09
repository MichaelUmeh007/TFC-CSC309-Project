from rest_framework import serializers

from studios.models import Class, ClassOccurrence, Studio

class StudioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Studio
        # These fields may not be enough for viewing an individual studio (do we need to see coaches and classes as well?)
        fields = ['id', 'name', 'address', 'latitude', 'longitude', 'postal_code', 'phone_number']

class ClassSerializer(serializers.ModelSerializer):
    # Consider displaying studio name instead of what it displays for studio as is (it shows id)
    class Meta:
        model = Class
        exclude = ['recurrences']

class ClassOccurrenceSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='parent_class.name')
    coach = serializers.CharField(source='parent_class.coach')
    studio_name = serializers.CharField(source='parent_class.studio.name')
    class Meta:
        model = ClassOccurrence
        exclude = ['id', 'parent_class']        # Exclude fields that we don't want to show the user
