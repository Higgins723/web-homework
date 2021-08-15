from rest_framework import generics
from django.db.models import Q

from merchants.models import Merchants
from .serializers import MerchantsSerializer


class MerchantsAPIView(generics.ListAPIView):
    permission_classes = []
    authentication_classes = []

    serializer_class = MerchantsSerializer

    def get_queryset(self):
        qs = Merchants.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            qs = qs.filter(Q(name__icontains=query) | Q(category__icontains=query))
        return qs

class MerchantsCreateAPIView(generics.CreateAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Merchants.objects.all()
    serializer_class = MerchantsSerializer

class MerchantsDetailAPIView(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Merchants.objects.all()
    serializer_class = MerchantsSerializer
    lookup_field = 'id'

class MerchantsUpdateAPIView(generics.UpdateAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Merchants.objects.all()
    serializer_class = MerchantsSerializer
    lookup_field = 'id'

class MerchantsDeleteAPIView(generics.DestroyAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Merchants.objects.all()
    serializer_class = MerchantsSerializer
    lookup_field = 'id'
