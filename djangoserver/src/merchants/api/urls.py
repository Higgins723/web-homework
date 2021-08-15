from django.urls import path
from .views import (
    MerchantsAPIView,
    MerchantsCreateAPIView,
    MerchantsDetailAPIView,
    MerchantsUpdateAPIView,
    MerchantsDeleteAPIView,
)

urlpatterns = [
    path('', MerchantsAPIView.as_view(), name='merchants-list'),
    path('create/', MerchantsCreateAPIView.as_view(), name='merchant-create'),
    path('<int:id>/', MerchantsDetailAPIView.as_view(), name='merchant-detail'),
    path('<int:id>/update/', MerchantsUpdateAPIView.as_view(), name='merchant-update'),
    path('<int:id>/delete/', MerchantsDeleteAPIView.as_view(), name='merchant-delete'),
]

