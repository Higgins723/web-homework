from datetime import datetime
import pytz
from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.db.models import Q

from merchants.models import Merchants
from merchants.api.serializers import MerchantsSerializer
from employees.models import Employees
from employees.api.serializers import EmployeesSerializer
from transactions.models import Transactions
from .serializers import TransactionSerializer
from companies.models import Companies
from companies.api.serializers import CompanyNonEmployeeSerializer


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
        qs = Transactions.objects.all().order_by('-id')
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

    def create(self, request, *args, **kwargs):
        transaction_data = request.data

        # create or get id for merchant
        merchant = transaction_data['merchant']
        if type(merchant) is dict:
            try:
                obj, created = Merchants.objects.get_or_create(name=merchant['name'], category=merchant['category'])
                merchant_data = MerchantsSerializer(obj).data
                transaction_data['merchant'] = merchant_data['id']
            except:
                return Response({'error': 'Error creating merchant'}, status=status.HTTP_403_FORBIDDEN)
        if type(merchant) is int:
            transaction_data['merchant'] = merchant

        # get company information based on user who created transaction
        employee = Employees.objects.get(id=transaction_data['user'])
        employee_serialized = EmployeesSerializer(employee).data
        company = Companies.objects.get(id=employee_serialized['company']['id'])
        company_serialized = CompanyNonEmployeeSerializer(company).data
        limit = company_serialized['available_credit']
        amount = transaction_data['amount']

        # check if company credit limit has enough funds to cover new transaction
        new_limit = round(limit - amount, 2)
        if new_limit > 0:
            Companies.objects.filter(id=employee_serialized['company']['id']).update(available_credit=new_limit)
        else:
            return Response(
                {'error': f'Company {company_serialized["name"]} does not have enough credit to cover purchase of {amount}'},
                status=status.HTTP_403_FORBIDDEN
            )

        new_transaction = Transactions.objects.create(
            user=Employees.objects.get(id=transaction_data['user']),
            merchant=Merchants.objects.get(id=transaction_data['merchant']),
            description=transaction_data['description'],
            debit=transaction_data['debit'],
            credit=transaction_data['credit'],
            amount=transaction_data['amount']
        )
        new_transaction.save()
        new_transaction_serializer = TransactionSerializer(new_transaction)
        return Response(new_transaction_serializer.data)

class TransactionsDetailAPIView(generics.RetrieveAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'

class TransactionsUpdateAPIView(generics.UpdateAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'

class TransactionsDeleteAPIView(generics.DestroyAPIView):
    permission_classes = []
    authentication_classes = []

    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'
