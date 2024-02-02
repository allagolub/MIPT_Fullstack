from rest_framework import serializers
from .models import Order
from user.serializers import UserSerializer
from flight.serializers import FlightSerializer
from passenger.serializers import PassengerSerializer

class OrderSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  passenger_set = PassengerSerializer(many=True, read_only=True)
  flight = FlightSerializer(read_only=True)
  
  class Meta:
    model = Order
    fields = '__all__'
