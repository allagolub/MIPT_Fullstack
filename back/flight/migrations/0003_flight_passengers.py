# Generated by Django 4.2.7 on 2023-12-17 14:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("flight", "0002_remove_flight_time_from_remove_flight_time_to"),
    ]

    operations = [
        migrations.AddField(
            model_name="flight",
            name="passengers",
            field=models.IntegerField(default=0),
        ),
    ]
