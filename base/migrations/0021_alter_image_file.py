# Generated by Django 4.1.3 on 2023-01-21 22:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0020_rename_imagefile_image_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='file',
            field=models.ImageField(blank=True, height_field='400', null=True, upload_to='', width_field='450'),
        ),
    ]
