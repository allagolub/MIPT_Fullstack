from rest_framework import serializers
from .models import Flight

class FlightSerializer(serializers.ModelSerializer):
  time_in_flight_display = serializers.SerializerMethodField()
  formatted_date_from = serializers.SerializerMethodField()
  formatted_time_from = serializers.SerializerMethodField()
  formatted_date_to = serializers.SerializerMethodField()
  formatted_time_to = serializers.SerializerMethodField()

  class Meta:
    model = Flight
    fields = '__all__'

  def get_time_in_flight_display(self, obj):
    return obj.get_time_in_flight_display()  

  def get_formatted_date_from(self, obj):
        return obj.get_formatted_date_from()

  def get_formatted_time_from(self, obj):
      return obj.get_formatted_time_from()

  def get_formatted_date_to(self, obj):
      return obj.get_formatted_date_to()

  def get_formatted_time_to(self, obj):
      return obj.get_formatted_time_to()