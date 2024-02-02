from rest_framework import serializers
from .models import Passenger
from user.serializers import UserSerializer

class PassengerSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = Passenger
    fields = '__all__'
