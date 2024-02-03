from django.db import models
from user.models import User
from flight.models import Flight
from passenger.models import Passenger

class Order(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    passengers = models.ManyToManyField(Passenger)
