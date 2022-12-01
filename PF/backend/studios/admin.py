from django.contrib import admin

from .models import Amenity, Image, Studio, Class, Keyword

# Studio-based admin panel functions
class AmenityInline(admin.TabularInline):
    model = Amenity
    extra = 1

class ImageInline(admin.StackedInline):
    model = Image
    extra = 1

class StudioAdmin(admin.ModelAdmin):
    # Don't include any fieldsets for now
    # fieldsets = [
    #     (None,               {'fields': ['question_text']}),
    #     ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    # ]
    inlines = [AmenityInline, ImageInline]

# Class-based admin panel functions
class KeywordInline(admin.TabularInline):
    model = Keyword
    extra = 1

class ClassAdmin(admin.ModelAdmin):
    inlines = [KeywordInline]


# Register your models here.
admin.site.register(Studio, StudioAdmin)
admin.site.register(Class)
