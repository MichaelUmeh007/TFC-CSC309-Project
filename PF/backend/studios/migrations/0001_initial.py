# Generated by Django 4.1.3 on 2022-12-04 15:43

import accounts.validators
import datetime
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import recurrence.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('coach', models.CharField(max_length=255)),
                ('capacity', models.PositiveIntegerField()),
                ('start_datetime', models.DateTimeField(null=True)),
                ('end_datetime', models.DateTimeField(null=True)),
                ('duration', models.DurationField(default=datetime.timedelta(seconds=10800))),
                ('is_recurring', models.BooleanField(default=True)),
                ('recurrences', recurrence.fields.RecurrenceField(null=True)),
            ],
            options={
                'verbose_name_plural': 'Classes',
            },
        ),
        migrations.CreateModel(
            name='Studio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=8, validators=[django.core.validators.MaxValueValidator(90), django.core.validators.MinValueValidator(-90)])),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9, validators=[django.core.validators.MaxValueValidator(180), django.core.validators.MinValueValidator(-180)])),
                ('postal_code', models.CharField(max_length=7, validators=[django.core.validators.RegexValidator('\\b[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z]\\s\\d[ABCEGHJ-NPRSTV-Z]\\d\\b')])),
                ('phone_number', models.CharField(max_length=255, unique=True, validators=[accounts.validators.validate_international_phonenumber])),
            ],
        ),
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=255)),
                ('ex_class', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ImageField(upload_to='images/')),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio')),
            ],
        ),
        migrations.CreateModel(
            name='ClassOccurrence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_datetime', models.DateTimeField(null=True)),
                ('end_datetime', models.DateTimeField(null=True)),
                ('num_attending', models.PositiveIntegerField(null=True)),
                ('parent_class', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.class')),
            ],
        ),
        migrations.AddField(
            model_name='class',
            name='studio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio'),
        ),
        migrations.CreateModel(
            name='Amenity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=255)),
                ('quantity', models.PositiveIntegerField()),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studios.studio')),
            ],
            options={
                'verbose_name_plural': 'Amenities',
            },
        ),
    ]
