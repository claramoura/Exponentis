# Generated by Django 4.1.3 on 2022-12-08 18:39

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('course', models.CharField(max_length=100)),
                ('units', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Lessons',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('keyConcept', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Graphs',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('expression', models.JSONField()),
                ('mathBounds', models.JSONField()),
                ('points', models.JSONField()),
                ('lessonId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.lessons')),
            ],
        ),
        migrations.CreateModel(
            name='Exercises',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('prompt', models.TextField()),
                ('choices', models.JSONField()),
                ('answer', models.TextField()),
                ('submitted', models.BooleanField(default=False)),
                ('lessonId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.lessons')),
            ],
        ),
        migrations.CreateModel(
            name='Examples',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('prompt', models.TextField()),
                ('solution', models.TextField()),
                ('lessonId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.lessons')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('courseProgress', models.JSONField()),
                ('unitProgress', models.JSONField()),
                ('submissions', models.JSONField()),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
