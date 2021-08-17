from django.db import models
from companies.models import Companies

# Create your models here.
class Employees(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    dob = models.CharField(max_length=10)
    company = models.ForeignKey(Companies, on_delete=models.CASCADE)

    def __str__(self):
        return str(f'{self.last_name}, {self.first_name}')

    class Meta:
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'