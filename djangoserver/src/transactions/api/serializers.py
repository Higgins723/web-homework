from rest_framework import serializers
from transactions.models import Transactions

from employees.api.serializers import EmployeesSerializer
from merchants.api.serializers import MerchantsSerializer


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = [
            'id',
            'user',
            'merchant',
            'description',
            'debit',
            'credit',
            'amount',
            'timestamp',
        ]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['user'] = EmployeesSerializer(instance.user).data
        rep['merchant'] = MerchantsSerializer(instance.merchant).data
        return rep

    # ensure that only debit or credit is True
    def validate(self, data):
        debit = data.get('debit', None)
        credit = data.get('credit', None)

        if debit and credit:
            raise serializers.ValidationError('Credit and Debit can both not be True')
        if not debit and not credit:
            raise serializers.ValidationError('Credit or Debit must be True')

        return data
