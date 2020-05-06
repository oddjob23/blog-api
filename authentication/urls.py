from django.urls import path

from .views import RegistrationAPIView, LoginAPIView, UserListAPIView

app_name = 'authentication'
urlpatterns = [
    path('auth/register/', RegistrationAPIView.as_view()),
    path('auth/login/', LoginAPIView.as_view()),
    path('users/', UserListAPIView.as_view())
]
