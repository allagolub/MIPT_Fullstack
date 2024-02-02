from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework import viewsets
from .models import Passenger
from .serializers import PassengerSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'index.html', {
        'single_passenger': Passenger.objects.get(id=1),
        'all_passengers': Passenger.objects.all()
    })

def get_passenger_details(request, pk):
    passenger = get_object_or_404(Passenger, pk=pk, user_id=request.user)
    serializer = PassengerSerializer(passenger)
    return Response(serializer.data)

@csrf_exempt
def delete_passenger(request, pk):
    if request.method == 'POST':
        try:
            passenger = Passenger.objects.get(id=pk)
            passenger.delete()
            return JsonResponse({'status': 'success'})
        except Passenger.DoesNotExist:
            return JsonResponse({'status': 'not found'}, status=404)
    return HttpResponseBadRequest()


class PassengerViewSet(viewsets.ModelViewSet):
  serializer_class = PassengerSerializer
  queryset = Passenger.objects.all()

  def get_queryset(self):
      user = self.request.user
      if user.is_authenticated:
          return Passenger.objects.filter(user_id=user)
      else:
          return Passenger.objects.none()

  def perform_create(self, serializer):
    serializer.save(user_id=self.request.user)