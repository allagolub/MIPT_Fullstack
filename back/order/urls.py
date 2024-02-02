from django.urls import path
from .views import delete_order
from .views import OrderViewSet
from .views import get_order_details

urlpatterns = [
  path('delete/<int:pk>/', delete_order, name='delete_order'),
  path('<int:pk>/', get_order_details, name='get_order_details'),
]