# Generated by Django 3.2.6 on 2021-08-15 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merchants', '0004_alter_merchants_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='merchants',
            name='category',
            field=models.CharField(choices=[('Miscellaneous', 'Miscellaneous'), ('Travel', 'Travel'), ('Dining', 'Dining'), ('Lodging', 'Lodging')], default='Miscellaneous', max_length=200),
        ),
    ]
