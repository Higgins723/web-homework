from rest_framework import serializers
from employees.models import Employees


class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = [
            'id',
            'first_name',
            'last_name',
            'dob',
        ]