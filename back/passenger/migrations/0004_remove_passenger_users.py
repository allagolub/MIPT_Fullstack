# Generated by Django 4.2.7 on 2023-12-16 19:54

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("passenger", "0003_alter_passenger_users"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="passenger",
            name="users",
        ),
    ]
