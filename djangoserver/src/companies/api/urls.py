from django.urls import path
from .views import (
    CompaniesAPIView,
    CompaniesCreateAPIView,
    CompaniesDetailAPIView,
    CompaniesUpdateAPIView,
    CompaniesDeleteAPIView,
)

urlpatterns = [
    path('', CompaniesAPIView.as_view(), name='companies-list'),
    path('create/', CompaniesCreateAPIView.as_view(), name='company-create'),
    path('<int:id>/', CompaniesDetailAPIView.as_view(), name='company-detail'),
    path('<int:id>/update/', CompaniesUpdateAPIView.as_view(), name='company-update'),
    path('<int:id>/delete/', CompaniesDeleteAPIView.as_view(), name='company-delete'),
]
