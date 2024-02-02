from django.shortcuts import render
from rest_framework import viewsets
from .models import Flight
from .serializers import FlightSerializer

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get_queryset(self):
        queryset = Flight.objects.all()
        city_from = self.request.query_params.get('from', None)
        city_to = self.request.query_params.get('to', None)
        date = self.request.query_params.get('date', None)
        passengers = self.request.query_params.get('passengers', None)

        if city_from:
            queryset = queryset.filter(city_from__iexact=city_from.lower())
        if city_to:
            queryset = queryset.filter(city_to__iexact=city_to.lower())
        if date:
            queryset = queryset.filter(date_from__date=date)
        if passengers:
            queryset = queryset.filter(seats__gte=passengers)
        return queryset