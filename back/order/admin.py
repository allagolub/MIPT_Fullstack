from django.contrib import admin
from .models import Order

class OrderAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'flight_id')
    filter_horizontal = ('passengers',)

admin.site.register(Order, OrderAdmin)
