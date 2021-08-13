from django.db import models
from employees.models import Employees
from merchants.models import Merchants

# Create your models here.
class Transactions(models.Model):
    user = models.ForeignKey(Employees, on_delete=models.CASCADE)
    merchant = models.ForeignKey(Merchants, on_delete=models.CASCADE)
    description = models.CharField(max_length=100)
    debit = models.BooleanField()
    credit = models.BooleanField()
    amount = models.FloatField()
    updated = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(f'{self.user.first_name} - {self.merchant.name} - {self.description}')
