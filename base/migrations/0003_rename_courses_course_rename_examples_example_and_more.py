# Generated by Django 4.1.3 on 2022-12-08 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_user_courseprogress_alter_user_submissions_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Courses',
            new_name='Course',
        ),
        migrations.RenameModel(
            old_name='Examples',
            new_name='Example',
        ),
        migrations.RenameModel(
            old_name='Exercises',
            new_name='Exercise',
        ),
        migrations.RenameModel(
            old_name='Lessons',
            new_name='Lesson',
        ),
    ]
