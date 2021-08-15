from django.urls import path
from .views import (
    TransactionsAPIView,
    TransactionsCreateAPIView,
    TransactionsDetailAPIView,
    TransactionsUpdateAPIView,
    TransactionsDeleteAPIView,
)

urlpatterns = [
    path('', TransactionsAPIView.as_view(), name='transactions-list'),
    path('create/', TransactionsCreateAPIView.as_view(), name='transaction-create'),
    path('<int:id>/', TransactionsDetailAPIView.as_view(), name='transaction-detail'),
    path('<int:id>/update/', TransactionsUpdateAPIView.as_view(), name='transaction-update'),
    path('<int:id>/delete/', TransactionsDeleteAPIView.as_view(), name='transaction-delete'),
]
