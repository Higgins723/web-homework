from django.db import models

# Create your models here.
class Companies(models.Model):
    name = models.CharField(max_length=50)
    credit_line = models.FloatField()
    available_credit = models.FloatField()

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural =  'Companies'