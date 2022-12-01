from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from studios.views import (ListStudiosView, StudioView, ListClassesForStudioView, 
                            ClassDetailsView, ClassScheduleView, ClassEnrollmentView, 
                            ClassFilterView, StudioFilterView)

app_name = 'studios'

urlpatterns = [
    path('all/', ListStudiosView.as_view(), name="all-studios"),
    path('filter', StudioFilterView.as_view(), name="filter-studios"),
    path('<int:studio_id>/details/', StudioView.as_view(), name="studio-details"),
    path('<int:studio_id>/classes/all/', ListClassesForStudioView.as_view(), name='studio-all-classes'),
    path('<int:studio_id>/classes/schedule/', ClassScheduleView.as_view(), name='studio-class-schedule'),
    path('<int:studio_id>/classes/filter', ClassFilterView.as_view(), name="class-filter"),
    path('<int:studio_id>/classes/<int:class_id>/details/', ClassDetailsView.as_view(), name='class-details'),
    path('<int:studio_id>/classes/<int:class_id>/enrollment/', ClassEnrollmentView.as_view(), name='class-enrollment'),
]