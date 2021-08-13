# Django Rest-Framework API

I've never used Elixir and it's been a while since I've used MongoDB. Decided to just throw together my own backend API to make things easier.

- Still show backend capability
- Less time struggling for Homework assignment

## Setup for viewing purposes

- cd into `/djangoserver`
- using Python3 run `python3 -m venv .`
- run `source bin/activate`
- cd into folder `/djangoserver/src`
- run `pip install -r requirements.txt`
- run `python manage.py makemigrations`
- run `python manage.py migrate`
- run `python manage.py runserver`
- headover to webapp for UI integration
- or you can reach backend piece at: `http://localhost:8000/`

## Additional Information

- To login to backend service go to: `http://localhost:8000/admin/`
- Here are the credentials:
    - Username: `admin`
    - Password: `password`

## Tech

This app is using the following technologies:

- [Django](https://www.djangoproject.com/) - Awesome python web framework
- [Django REST Framework](https://www.django-rest-framework.org/) - Toolkit for web APIs
- [SQLite](https://www.sqlite.org/index.html) - Simple DB to load data for `webapp`
- [Python3](https://www.python.org/) - Main language for backend app

