from django.db import models
from user.models import User

class Passenger(models.Model):
    email = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    middlename = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    birth_date = models.CharField(max_length=10)
    document_type = models.CharField(max_length=10)
    document_id = models.CharField(max_length=10**10)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

