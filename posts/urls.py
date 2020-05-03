from django.urls import path
from .views import PostList, PostDetail, UserList


urlpatterns = [
    path('posts/<int:pk>', PostDetail.as_view()),
    path('posts/', PostList.as_view()),
    path('users/', UserList.as_view())
]
