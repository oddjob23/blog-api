# Generated by Django 2.2 on 2020-05-12 10:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_manager',
        ),
    ]
