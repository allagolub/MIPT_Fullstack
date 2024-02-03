from django.contrib import admin
from .models import Passenger

class PassengerAdmin(admin.ModelAdmin):
  fields = ('email', 'name', 'surname', 'middlename', 'gender', 'document_type', 'document_id', 'birth_date', 'user_id')

admin.site.register(Passenger, PassengerAdmin)
