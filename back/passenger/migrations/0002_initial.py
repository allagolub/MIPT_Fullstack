# Generated by Django 4.2.7 on 2023-11-24 18:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('passenger', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='passenger',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
