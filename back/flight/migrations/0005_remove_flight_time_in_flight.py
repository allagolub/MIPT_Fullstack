# Generated by Django 4.2.7 on 2023-12-17 15:32

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("flight", "0004_rename_passengers_flight_seats"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="flight",
            name="time_in_flight",
        ),
    ]