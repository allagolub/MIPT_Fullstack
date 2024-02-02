from django.contrib import admin
from .models import Flight

class FlightAdmin(admin.ModelAdmin):
  fields = ('city_from', 'city_to', 'airport_from', 'airport_to', 'date_from', 'date_to',
  'flight_sum','luggage', 'hand_laggage', 'refund', 'seats')

admin.site.register(Flight, FlightAdmin)
