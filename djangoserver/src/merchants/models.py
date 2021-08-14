from django.db import models

# Create your models here.
class Merchants(models.Model):
    name = models.CharField(max_length=200, unique=True)
    category = models.CharField(max_length=200)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Merchant'
        verbose_name_plural = 'Merchants'