from django.urls import path
from .views import (
    MerchantsAPIView,
    MerchantsCreateAPIView,
    MerchantsDetailAPIView,
)

urlpatterns = [
    path('', MerchantsAPIView.as_view(), name='merchants-list'),
    path('create/', MerchantsCreateAPIView.as_view(), name='merchant-create'),
    path('<int:id>/', MerchantsDetailAPIView.as_view(), name='merchant-detail'),
]

