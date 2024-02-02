"""
URL configuration for back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from passenger.views import PassengerViewSet
from flight.views import FlightViewSet
from order.views import OrderViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from user.views import UserViewSet, UserCurrent


router = routers.DefaultRouter()
router.register(r'passenger', PassengerViewSet)
router.register(r'flight', FlightViewSet)
router.register(r'order', OrderViewSet)
router.register(r'user', UserViewSet)



urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/passenger/', include('passenger.urls')),
    path('api/order/', include('order.urls')),
    path('user/', include('user.urls')),
    path("__debug__/", include("debug_toolbar.urls")),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/current', UserCurrent.as_view(), name="user_current"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
]
