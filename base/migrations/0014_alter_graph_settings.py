# Generated by Django 4.1.3 on 2022-12-21 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_alter_graph_settings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='graph',
            name='settings',
            field=models.JSONField(default=dict),
        ),
    ]
