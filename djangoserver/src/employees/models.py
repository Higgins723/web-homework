from django.db import models

# Create your models here.
class Employees(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    dob = models.CharField(max_length=10)

    def __str__(self):
        return str(f'{self.last_name}, {self.first_name}')