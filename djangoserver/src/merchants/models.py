from django.db import models

category_options = (
    ('Miscellaneous', 'Miscellaneous'),
    ('Travel', 'Travel'),
    ('Dining', 'Dining'),
    ('Lodging', 'Lodging'),
)

# Create your models here.
class Merchants(models.Model):
    name = models.CharField(max_length=200, unique=True)
    category = models.CharField(max_length=200, choices=category_options, default='Miscellaneous')

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Merchant'
        verbose_name_plural = 'Merchants'