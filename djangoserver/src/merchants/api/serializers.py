from rest_framework import serializers
from merchants.models import Merchants


class MerchantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchants
        fields = [
            'id',
            'name',
            'category',
        ]