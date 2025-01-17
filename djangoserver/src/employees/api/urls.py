from django.urls import path
from .views import (
    EmployeesAPIView,
    EmployeesCreateAPIView,
    EmployeesDetailAPIView,
    EmployeesUpdateAPIView,
    EmployeesDeleteAPIView,
)

urlpatterns = [
    path('', EmployeesAPIView.as_view(), name='employees-list'),
    path('create/', EmployeesCreateAPIView.as_view(), name='employee-create'),
    path('<int:id>/', EmployeesDetailAPIView.as_view(), name='employee-detail'),
    path('<int:id>/update/', EmployeesUpdateAPIView.as_view(), name='employee-update'),
    path('<int:id>/delete/', EmployeesDeleteAPIView.as_view(), name='employee-delete'),
]
