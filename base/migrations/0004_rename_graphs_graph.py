# Generated by Django 4.1.3 on 2022-12-08 18:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_rename_courses_course_rename_examples_example_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Graphs',
            new_name='Graph',
        ),
    ]