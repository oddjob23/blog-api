from rest_framework import generics, permissions
from .models import Post
from django.contrib.auth.models import User
from .serializers import PostSerializer, UserSerializer
from .permissions import IsAuthorOrReadOnly
# Create your views here.


class PostList(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class UserList(generics.ListAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
