# Generated by Django 4.1.3 on 2022-12-08 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_exercise_responsetype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='responseType',
            field=models.CharField(choices=[('SA', 'short answer'), ('MC', 'multiple choice')], default='MC', max_length=20),
        ),
    ]
