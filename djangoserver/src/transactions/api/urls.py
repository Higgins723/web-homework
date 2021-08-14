from django.urls import path
from .views import (
    TransactionsAPIView,
    TransactionsCreateAPIView,
    TransactionsDetailAPIView,
)

urlpatterns = [
    path('', TransactionsAPIView.as_view(), name='transactions-list'),
    path('create/', TransactionsCreateAPIView.as_view(), name='transaction-create'),
    path('<int:id>/', TransactionsDetailAPIView.as_view(), name='transaction-detail'),
    # path('<int:id>/update/', TransactionUpdateAPIView.as_view()),
    # path('<int:id>/delete/', TransactionDeleteAPIView.as_view()),
]
