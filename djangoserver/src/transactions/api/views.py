from datetime import datetime
import pytz
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from transactions.models import Transactions
from .serializers import TransactionSerializer


class ResultsSetPagination(PageNumberPagination):
    # pagination count set low for demonstration purposes
    page_size_query_param = 'page_size'
    page_size = 10
    max_page_size = 20


class TransactionsAPIView(generics.ListAPIView):
    permission_classes = []
    authentication_classes = []

    pagination_class = ResultsSetPagination
    serializer_class = TransactionSerializer

    def get_queryset(self):
        qs = Transactions.objects.all()
        query = self.request.GET.get('q')
        dateQueryStart = self.request.GET.get('start')
        dateQueryEnd = self.request.GET.get('end')
        amountMin = self.request.GET.get('min')
        amountMax = self.request.GET.get('max')
        cardType = self.request.GET.get('type')

        if query is not None:
            for search in query.split():
                qs = qs.filter(
                    (Q(user__first_name__icontains=search) | Q(user__last_name__icontains=search)) |
                    (Q(merchant__name__icontains=search) | Q(merchant__category__icontains=search)) |
                    (
                        Q(description__icontains=search)
                    )
                )

        if dateQueryStart is not None and dateQueryEnd is not None:
            start_date_list = list(map(int, dateQueryStart.split('-')))
            end_date_list = list(map(int, dateQueryEnd.split('-')))
            start_date = datetime(start_date_list[0], start_date_list[1], start_date_list[2], 0, 0, 0, 0, pytz.UTC)
            end_date = datetime(end_date_list[0], end_date_list[1], end_date_list[2], 23, 59, 59, 999999, pytz.UTC)

            qs = qs.filter(Q(timestamp__range=(start_date, end_date)))

        if amountMin is not None and amountMax is not None:
            qs = qs.filter(Q(amount__gte=amountMin, amount__lte=amountMax))
        if amountMin is not None and amountMax is None:
            qs = qs.filter(Q(amount__gte=amountMin))
        if amountMin is None and amountMax is not None:
            qs = qs.filter(Q(amount__lte=amountMax))

        if cardType is not None:
            if cardType == 'debit':
                qs = qs.filter(Q(debit=True))
            if cardType == 'credit':
                qs = qs.filter(Q(credit=True))

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
