from django.urls import path
from .views import get_passenger_details
from .views import delete_passenger
from .views import PassengerViewSet

urlpatterns = [
  path('<int:pk>/', get_passenger_details, name='get_passenger_details'),
  path('delete/<int:pk>/', delete_passenger, name='delete_passenger'),
]