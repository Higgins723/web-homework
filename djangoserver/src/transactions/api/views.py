from rest_framework import generics
from django.db.models import Q

from transactions.models import Transactions
from .serializers import TransactionSerializer


class TransactionsAPIView(generics.ListAPIView):
    permission_classes = []
    authentication_classes = []

    serializer_class = TransactionSerializer

    def get_queryset(self):
        qs = Transactions.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            for search in query.split():
                qs = qs.filter(
                    (Q(user__first_name__icontains=search) | Q(user__last_name__icontains=search)) |
                    (Q(merchant__name__icontains=search) | Q(merchant__category__icontains=search)) |
                    (
                        Q(description__icontains=search)
                    )
                )
        return qs

class TransactionsCreateAPIView(generics.CreateAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer

class TransactionsDetailAPIView(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'
