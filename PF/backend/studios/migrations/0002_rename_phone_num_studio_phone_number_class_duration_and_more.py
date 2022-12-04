# Generated by Django 4.1.3 on 2022-11-15 02:54

import datetime
import django.core.validators
from django.db import migrations, models
import recurrence.fields


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studio',
            old_name='phone_num',
            new_name='phone_number',
        ),
        migrations.AddField(
            model_name='class',
            name='duration',
            field=models.DurationField(default=datetime.timedelta(seconds=10800)),
        ),
        migrations.AddField(
            model_name='class',
            name='end_datetime',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='class',
            name='is_recurring',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='class',
            name='recurrences',
            field=recurrence.fields.RecurrenceField(null=True),
        ),
        migrations.AddField(
            model_name='class',
            name='start_datetime',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='studio',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=8, validators=[django.core.validators.MaxValueValidator(90), django.core.validators.MinValueValidator(-90)]),
        ),
        migrations.AlterField(
            model_name='studio',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, validators=[django.core.validators.MaxValueValidator(180), django.core.validators.MinValueValidator(-180)]),
        ),
        migrations.AlterField(
            model_name='studio',
            name='postal_code',
            field=models.CharField(max_length=7, validators=[django.core.validators.RegexValidator('\\b[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z]\\s\\d[ABCEGHJ-NPRSTV-Z]\\d\\b')]),
        ),
    ]