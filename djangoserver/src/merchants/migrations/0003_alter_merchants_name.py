# Generated by Django 3.2.6 on 2021-08-13 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merchants', '0002_remove_merchants_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='merchants',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
