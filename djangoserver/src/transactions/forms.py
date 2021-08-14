from django import forms

from .models import Transactions

class TransactionForm(forms.ModelForm):
    class Meta:
        model = Transactions
        fields = [
            'user',
            'merchant',
            'description',
            'debit',
            'credit',
            'amount',
        ]

    def clean(self, *args, **kwargs):
        data = self.cleaned_data
        credit = data.get('credit', None)
        debit = data.get('debit', None)
        if credit and debit:
            raise forms.ValidationError('Credit and Debit can both not be True')
        if not credit and not debit:
            raise forms.ValidationError('Credit or Debit must be True')
        return super().clean(*args, **kwargs)