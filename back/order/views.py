from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView
from django.urls import reverse

from rest_framework import viewsets, mixins, permissions
from rest_framework.response import Response
from .serializers import OrderSerializer
from django.http import JsonResponse, HttpResponseBadRequest
from .models import Order
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt

from flight.models import Flight
from passenger.models import Passenger


@csrf_exempt
def delete_order(request, pk):
    if request.method == 'POST':
        try:
          order = Order.objects.get(id=pk)
          flight_id = order.flight.id
          flight = Flight.objects.get(id=flight_id)

          passenger_count = len(order.passengers.all())
          new_seat_count = flight.seats + passenger_count
          flight.seats = max(new_seat_count, flight.seats)
          flight.save()
          
          order.delete()
          return JsonResponse({'status': 'success'})
        except Passenger.DoesNotExist:
            return JsonResponse({'status': 'not found'}, status=404)
    return HttpResponseBadRequest()

def get_order_details(request, pk):
    order = get_object_or_404(Order, pk=pk, user_id=request.user)
    serializer = OrderSerializer(order)
    return Response(serializer.data)


class IsOwnerPermission(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
    if not obj:
      return super().has_object_permission(request, view, obj)
    if request.user_id == obj.user_id:
      return True
    else:
      return False

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerPermission]

    def perform_create(self, serializer):
      if self.request.user.is_authenticated:
        passenger_ids = self.request.data.get('passengers', [])
        flight_id = self.request.data.get('flight_id')
        flight = Flight.objects.get(id=flight_id)
        new_seat_count = flight.seats - len(passenger_ids)
        flight.seats = max(new_seat_count, 0)
        flight.save()

        order = serializer.save(user=self.request.user, flight=flight, passengers=passenger_ids)
      return super().perform_create(serializer)

    def list(self, request):
      if request.user.is_authenticated:
        if Order.objects.filter(user=request.user).exists():
          queryset = Order.objects.filter(user=request.user)
          serializer = OrderSerializer(queryset, many=True)
          return Response(serializer.data)
      return Response(Order.objects.none())