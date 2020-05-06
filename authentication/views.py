from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer
from .renderers import UserJSONRenderer
from .models import User
# Create your views here.


class RegistrationAPIView(APIView):
    permission_classes = (AllowAny, )
    serializers_class = RegistrationSerializer
    renderer_classes = (UserJSONRenderer, )

    def post(self, request):
        user = request.data.get('user', {})

        serializer = self.serializers_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = LoginSerializer
    renderer_classes = (UserJSONRenderer, )

    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserListAPIView(ListAPIView):
    queryset = User.objects.all().order_by('created_at')
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer
