from rest_framework import generics
from django.db.models import Q

from employees.models import Employees
from .serializers import EmployeesSerializer


class EmployeesAPIView(generics.ListAPIView):
    permission_classes = []
    authentication_classes = []

    serializer_class = EmployeesSerializer

    def get_queryset(self):
        qs = Employees.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            for name in query.split():
                qs = qs.filter(Q(first_name__icontains=name) | Q(last_name__icontains=name))
        return qs

class EmployeesCreateAPIView(generics.CreateAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Employees.objects.all()
    serializer_class = EmployeesSerializer

class EmployeesDetailAPIView(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Employees.objects.all()
    serializer_class = EmployeesSerializer
    lookup_field = 'id'
