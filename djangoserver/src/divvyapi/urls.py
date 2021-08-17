"""divvyapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from transactions.api import urls as transactions_urls
from employees.api import urls as employees_urls
from merchants.api import urls as merchants_urls
from companies.api import urls as companies_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/transactions/', include(transactions_urls)),
    path('api/employees/', include(employees_urls)),
    path('api/merchants/', include(merchants_urls)),
    path('api/companies/', include(companies_urls)),
]
