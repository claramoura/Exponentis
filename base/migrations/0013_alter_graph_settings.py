# Generated by Django 4.1.3 on 2022-12-21 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_remove_exercise_submitted_graph_settings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='graph',
            name='settings',
            field=models.JSONField(),
        ),
    ]
