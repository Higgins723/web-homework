from django.contrib import admin

from .models import Transactions
from .forms import TransactionForm

# Register your models here.
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user', 'merchant', 'amount']
    form = TransactionForm

admin.site.register(Transactions, TransactionAdmin)
