from django.urls import path

from .views import RegistrationAPIView, LoginAPIView

app_name = 'authentication'
urlpatterns = [
    path('auth/register/', RegistrationAPIView.as_view()),
    path('auth/login/', LoginAPIView.as_view())
]
