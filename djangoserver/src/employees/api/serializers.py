from rest_framework import serializers
from employees.models import Employees
from companies.models import Companies


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = [
            'id',
            'name',
        ]


class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = [
            'id',
            'first_name',
            'last_name',
            'dob',
            'company'
        ]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['company'] = CompanySerializer(instance.company).data
        return rep