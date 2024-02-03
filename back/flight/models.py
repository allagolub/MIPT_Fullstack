from django.db import models
from django.conf import settings
from django.utils import timezone
import locale
locale.setlocale(locale.LC_TIME, 'ru_RU.UTF-8')

class Flight(models.Model):
    city_from = models.CharField(max_length=100)
    city_to = models.CharField(max_length=100)
    airport_from = models.CharField(max_length=100)
    airport_to = models.CharField(max_length=100)
    date_from = models.DateTimeField()
    date_to = models.DateTimeField()
    flight_sum = models.IntegerField(default=0)
    luggage = models.IntegerField(default=0)
    hand_laggage = models.IntegerField(default=0)
    seats = models.IntegerField(default=0)
    refund = models.CharField(max_length=100)

    def get_time_in_flight(self):
        time_diff = self.date_to - self.date_from
        total_minutes = time_diff.total_seconds() / 60
        return total_minutes

    def get_time_in_flight_display(self):
        total_minutes = self.get_time_in_flight()
        hours = int(total_minutes // 60)
        minutes = int(total_minutes % 60)
        return f"{hours}ч {minutes}м" if hours else f"{minutes}м"

    def get_formatted_date_from(self):
        date_obj = self.date_from.astimezone(timezone.get_current_timezone()) if settings.USE_TZ else self.date_from
        return date_obj.strftime("%d %B").lstrip("0").replace(" 0", " ")

    def get_formatted_time_from(self):
        date_obj = self.date_from.astimezone(timezone.get_current_timezone()) if settings.USE_TZ else self.date_from
        return date_obj.strftime("%H:%M")

    def get_formatted_date_to(self):
        date_obj = self.date_to.astimezone(timezone.get_current_timezone()) if settings.USE_TZ else self.date_to
        return date_obj.strftime("%d %B").lstrip("0").replace(" 0", " ")

    def get_formatted_time_to(self):
        date_obj = self.date_to.astimezone(timezone.get_current_timezone()) if settings.USE_TZ else self.date_to
        return date_obj.strftime("%H:%M")