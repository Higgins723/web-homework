from django.urls import path
from .views import (
    EmployeesAPIView,
    EmployeesCreateAPIView,
    EmployeesDetailAPIView,
)

urlpatterns = [
    path('', EmployeesAPIView.as_view(), name='employees-list'),
    path('create/', EmployeesCreateAPIView.as_view(), name='employee-create'),
    path('<int:id>/', EmployeesDetailAPIView.as_view(), name='employee-detail'),
]
