from datetime import datetime
from urllib import parse

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render
from geopy import distance
import geopy.geocoders
import certifi
import ssl
from geopy.geocoders import Nominatim
from rest_framework import generics, permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.pagination import PageNumberPagination

from accounts.models import GUser
from studios.models import Class, ClassOccurrence, Studio
from studios.serializers import (ClassOccurrenceSerializer, ClassSerializer,
                                 StudioSerializer)


# Create your views here.
# Can try using Generic APIViews for anything that does not need a lot of extra sorting 
class ListStudiosView(APIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination # This doesn't seem to be working

    """
    Endpoint: /studios/

    Purpose: Lists all Studios in the system. Orders all studios by distance to user's location 
    (closest to farthest.)
    """
    def get(self, request, format=None, **kwargs):        # What is format=None
        """
        List all the studios
        """
        # Setup the geocoder instance
        ctx = ssl.create_default_context(cafile=certifi.where())
        geopy.geocoders.options.default_ssl_context = ctx
        geolocator = Nominatim(user_agent="tfc")

        # Get all studios from the database
        studios = [studio for studio in Studio.objects.all()]

        try:
            # Get the distance from the user that made the request
            user = User.objects.get(username=request.user.username)
            guser = GUser.objects.get(user=user)

            # This needs to change (we need to geocode user's address or postal code)
            location = geolocator.geocode(guser.address, exactly_one=True, timeout=15)
            user_loc = (location.latitude, location.longitude)
           
            # Find the distance between the user and every studio
            distances = [distance.distance(user_loc, (studio.latitude, studio.longitude)) for studio in studios]

            # Naive sorting operation of all studios in order of closest location to user
            studios_and_distances = []
            for i in range(0, len(studios)):
                # Store a tuple with distance from studio to user and studio object for each studio
                pairing = (distances[i], studios[i])
                studios_and_distances.append(pairing)

            # From the sorted list of studios by closest distance to user, extract just the studio object
            studios = [studio[1] for studio in sorted(studios_and_distances)]

            # Return a response of all the studio objects 
            # DO WE NEED TO SERIALIZE THIS?
            serializer = StudioSerializer(studios, many=True)
            return Response(serializer.data, status=200)
        except:
            return Response({"error": "User not authorized"}, status=401)

# Studios filter view
class StudioFilterView(generics.ListAPIView):
    """
    endpoint: studios/filter/

    purpose: filter the studio based on the query string parameter
    """
    serializer_class = StudioSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = Studio.objects.all()
        # since we are only applying 1 filter at a time, check self.request.GET for each option
        if 'studio_name' in self.request.GET:
            return queryset.filter(name=self.request.GET['studio_name'])
        elif 'amenity' in self.request.GET:
            return queryset.filter(amenity__type__iexact=self.request.GET['amenity'])
        elif 'class_name' in self.request.GET:
            return queryset.filter(class__name__iexact=self.request.GET['class_name'])
        elif 'coach' in self.request.GET:
            return queryset.filter(class__coach__iexact=self.request.GET['coach'])
        return queryset

# Single studio view
class StudioView(generics.RetrieveAPIView):
    serializer_class = StudioSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        # return get_object_or_404(Studio, id=self.kwargs['studio_id'])
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])
    
    def finalize_response(self, request, response, *args, **kwargs):
        """Add the directions url for this specific user to this specific studio"""
        # Get address of studio
        if not Studio.objects.filter(id=self.kwargs['studio_id']):
            response = Response({"error": "Studio not found"}, status=404)
            return super().finalize_response(request, response, *args, **kwargs)

        studio_address = parse.quote(response.data['address'].encode('utf-8'))
        # studio = self.get_object()
        # studio_address = parse.quote(studio.address.encode('utf-8'))

        # Get address of guser
        user = User.objects.get(username=request.user.username)
        guser = GUser.objects.get(user=user)
        guser_address = parse.quote(guser.address.encode('utf-8'))

        # Build a Google Maps Directions URL (defaults to driving directions) for user and add to the response
        response.data['directions'] = f"https://www.google.com/maps/dir/?api=1&origin={guser_address}&destination={studio_address}&travelmode=driving"
        
        # Call superclass function to send response to user
        return super().finalize_response(request, response, *args, **kwargs)

# List all classes for single studio view
class ListClassesForStudioView(generics.ListAPIView):
    not_found = 0
    serializer_class = ClassSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        studio_id = self.kwargs['studio_id']

        try:
            studio = Studio.objects.get(id=studio_id)
            return studio.class_set.all()
        except:
            self.not_found = 1
            return []
    
    def finalize_response(self, request, response, *args, **kwargs):
        if self.not_found:
            response = Response({"error": "Studio not found."}, status=404)
            return super().finalize_response(request, response, *args, **kwargs)
        return super().finalize_response(request, response, *args, **kwargs)

# View class schedule for a studio
class ClassScheduleView(generics.ListAPIView):
    serializer_class = ClassOccurrenceSerializer
    not_found = 0
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        studio_id = self.kwargs['studio_id']

        try:
            studio = Studio.objects.get(id=studio_id)
            classes = studio.class_set.all()

            # Get ALL class occurrences for every class in this studio
            schedule = None
            index = 0
            for c in classes:
                # Build up a union of all querysets for every class occurrence
                if index == 0:
                    schedule = c.classoccurrence_set.all()
                else:
                    schedule = schedule.union(c.classoccurrence_set.all())
                
                index += 1
            
            # Order all class occurrences in ascending order of when they occur
            return schedule.order_by('start_datetime')
        except:
           self.not_found = 1
           return []
    
    def finalize_response(self, request, response, *args, **kwargs):
        if self.not_found:
            response = Response({"error": "Studio not found."}, status=404)
            return super().finalize_response(request, response, *args, **kwargs)
        return super().finalize_response(request, response, *args, **kwargs)

# View a single class
class ClassDetailsView(generics.RetrieveAPIView):
    serializer_class = ClassSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return get_object_or_404(Class, id=self.kwargs['class_id'])

    def finalize_response(self, request, response, *args, **kwargs):
        """Temporarily display all occurrences for a particular class"""
        # Build a Google Maps Directions URL (defaults to driving directions) for user and add to the response
        c = None
        try:
            c = Class.objects.get(id=self.kwargs['class_id'])
        except:
            response = Response({"error": "Class not found"}, status=404)
            return super().finalize_response(request, response, *args, **kwargs)

        # We will create all occurrence objects for this class if they don't already exist
        occurrence_set = c.classoccurrence_set.all()
        if not occurrence_set:
            # Create all of the occurrences for this particular class
            dates = c.recurrences.occurrences()
            start = c.start_datetime
            end = c.end_datetime

            for date in dates:
                start_datetime = date.replace(hour=start.hour, minute=start.minute, second=0)
                end_datetime = date.replace(hour=end.hour, minute=end.minute, second=0)
                num_attending = 0
                # occurrence = ClassOccurrenceSerializer(data=data)
                # if occurrence.is_valid():
                #     print("hello")
                #     occurrence.save()

                # We should be using serializers to create things but it's not working so we'll use regular creation
                occurrence = ClassOccurrence.objects.create(parent_class=c, start_datetime=start_datetime, end_datetime=end_datetime, num_attending=num_attending)
        
        # Also add the list of dates to the response
        dates = []
        for instance in c.classoccurrence_set.all():
            dates.append(instance.start_datetime)
        response.data['dates'] = dates

        # Call superclass function to send response to user
        return super().finalize_response(request, response, *args, **kwargs)

# Enrol in a class/drop the class
class ClassEnrollmentView(APIView):
    not_found = 0
    permission_classes = (IsAuthenticated,)
    parser_classes = [JSONParser]

    """
    Endpoint: /studios/

    Purpose: Lists all Studios in the system. Orders all studios by distance to user's location 
    (closest to farthest.)
    """
    def post(self, request, format=None, **kwargs):
        """Dealing with a user signing up for a class
        
        Request body format:
        {
            'action': 'enrol'/'drop',
            'all': 'true'/'false',
            'dates': []     # Start datetime of each class occurrence - empty if all is true
        }
        """
        # Get the user for this request
        user = User.objects.get(username=request.user.username)
        guser = GUser.objects.get(user=user)
        
        # Check if the user has a subscription
        if not guser.subscription:
            return Response({"error": "User does not have subscription."}, status=400)

        if request.data['action'] == 'enrol':
            # Get all the occurrences for this class
            parent_class = None
            occurrences = None
            try:
                parent_class = Class.objects.get(id=kwargs['class_id'])
                occurrences = parent_class.classoccurrence_set.all()
            except:
                return Response({"error": "Studio not found."}, status=404)

            # Add all the dates they enrolled in to their class occurrence list
            successful_enrols = []
            if request.data['all'] == 'true':
                # Enroll user in all occurrences if possible 
                for o in occurrences:
                    if o.num_attending < parent_class.capacity and o not in guser.class_occurrences.all():
                        # Add user to this class instance
                        guser.class_occurrences.add(o)
                        successful_enrols.append(o.start_datetime)

                        # Update the number of users attending the class instance
                        o.num_attending += 1
                        o.save()
            else:
                for date in request.data['dates']:
                    date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%SZ")
                    for o in occurrences:
                        # Find the date in the datetimes and 
                        if date.date() == o.start_datetime.date() and o.num_attending < parent_class.capacity and o not in guser.class_occurrences.all():
                            # Add user to this class instance
                            guser.class_occurrences.add(o)
                            successful_enrols.append(date)

                            # Update the number of users attending the class instance
                            o.num_attending += 1
                            o.save()

                            # Move to next date
                            break
            
            return Response({'successes': successful_enrols}, status=200)
        elif request.data['action'] == 'drop':
            # Get all the occurrences for this class
            parent_class = None
            occurrences = None
            try:
                parent_class = Class.objects.get(id=kwargs['class_id'])
                occurrences = parent_class.classoccurrence_set.all()
            except:
                return Response({"error": "Studio not found."}, status=404)

            # Add all the dates they enrolled in to their class occurrence list
            drops = []
            if request.data['all'] == 'true':
                # Enroll user in all occurrences if possible 
                for o in occurrences:
                    # Add user to this class instance
                    if o in guser.class_occurrences.all():
                        guser.class_occurrences.remove(o)
                        drops.append(o.start_datetime)

                        # Update the number of users attending the class instance
                        o.num_attending -= 1
                        o.save()
            else:
                for date in request.data['dates']:
                    date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%SZ")
                    for o in occurrences:
                        # Find the date in the datetimes and 
                        if date.date() == o.start_datetime.date() and o in guser.class_occurrences.all():
                            # Add user to this class instance
                            guser.class_occurrences.remove(o)
                            drops.append(date)

                            # Update the number of users attending the class instance
                            o.num_attending -= 1
                            o.save()

                            # Move to next date
                            break
            
            return Response({'successes': drops}, status=200)
        else:
            return Response({"error": "Not a valid operation"}, status=400)

#class filter view
class ClassFilterView(generics.ListAPIView):
    not_found = 0
    serializer_class = ClassOccurrenceSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = [JSONParser]

    def get_queryset(self):
        studio_id = self.kwargs['studio_id']
        try: 
            studio = Studio.objects.get(id=studio_id)
            classes = studio.class_set.all()

            if 'class_name' in self.request.GET:
                # Get ALL class occurrences for every class in this studio
                queryset = None
                index = 0
                for c in classes:
                    # Build up a union of all querysets for every class occurrence
                    if index == 0:
                        queryset = c.classoccurrence_set.filter(parent_class__name__iexact=self.request.GET['class_name'])
                    else:
                        queryset = queryset.union(c.classoccurrence_set.filter(parent_class__name__iexact=self.request.GET['class_name']))
                    index += 1
                return queryset
                # return queryset.filter(parent_class__name=self.request.GET['class_name'])
            elif 'coach' in self.request.GET:
                # Get ALL class occurrences for every class in this studio
                queryset = None
                index = 0
                for c in classes:
                    # Build up a union of all querysets for every class occurrence
                    if index == 0:
                        queryset = c.classoccurrence_set.filter(parent_class__coach__iexact=self.request.GET['coach'])
                    else:
                        queryset = queryset.union(c.classoccurrence_set.filter(parent_class__coach__iexact=self.request.GET['coach']))
                    index += 1
                return queryset
                # return queryset.filter(coach=self.request.GET['coach'])
            elif 'start_date_time' in self.request.GET and 'end_date_time' in self.request.GET:
                # Convert dates into proper format
                start = datetime.strptime(self.request.GET['start_date_time'], "%Y-%m-%dT%H:%M:%SZ")
                end = datetime.strptime(self.request.GET['end_date_time'], "%Y-%m-%dT%H:%M:%SZ")

                # Get ALL class occurrences for every class in this studio
                queryset = None
                index = 0
                for c in classes:
                    # Build up a union of all querysets for every class occurrence
                    if index == 0:
                        # queryset = c.classoccurrence_set.filter(date__range=[start, end])
                        queryset = c.classoccurrence_set.filter(start_datetime__gte=start, end_datetime__lte=end)
                    else:
                        queryset = c.classoccurrence_set.filter(start_datetime__gte=start, end_datetime__lte=end)
                    index += 1
                return queryset.order_by('start_datetime')
            return queryset
        except: 
            self.not_found = 1
            return []
    
    def finalize_response(self, request, response, *args, **kwargs):
        if self.not_found:
            response = Response({"error": "Studio not found."}, status=404)
            return super().finalize_response(request, response, *args, **kwargs)
        return super().finalize_response(request, response, *args, **kwargs)
