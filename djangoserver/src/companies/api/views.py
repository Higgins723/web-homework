from rest_framework import generics

from companies.models import Companies
from .serializers import CompanySerializer


class CompaniesAPIView(generics.ListAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Companies.objects.all().order_by('-id')
    serializer_class = CompanySerializer

class CompaniesCreateAPIView(generics.CreateAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Companies.objects.all()
    serializer_class = CompanySerializer

class CompaniesDetailAPIView(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Companies.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'id'

class CompaniesUpdateAPIView(generics.UpdateAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Companies.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'id'

class CompaniesDeleteAPIView(generics.DestroyAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Companies.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'id'

