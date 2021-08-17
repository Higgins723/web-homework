from rest_framework import serializers
from companies.models import Companies
from employees.models import Employees

class EmployeeCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = [
            'id',
            'first_name',
            'last_name',
            'dob',
        ]

class CompanyNonEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = [
            'id',
            'name',
            'credit_line',
            'available_credit'
        ]

class CompanySerializer(serializers.ModelSerializer):
    employees = serializers.SerializerMethodField()

    class Meta:
        model = Companies
        fields = [
            'id',
            'name',
            'credit_line',
            'available_credit',
            'employees',
        ]

    def get_employees(self, instance):
        returnList = []

        employees = Employees.objects.filter(company=instance.id)
        for employee in employees:
            serialized_data = EmployeeCompanySerializer(employee).data
            returnList.append(serialized_data)

        return returnList