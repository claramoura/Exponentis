# Generated by Django 4.1.3 on 2022-12-21 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_exercise_choices'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='submitted',
        ),
        migrations.AddField(
            model_name='graph',
            name='settings',
            field=models.JSONField(default=dict),
        ),
    ]
