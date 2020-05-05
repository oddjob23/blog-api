from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from posts.views import ObtainTokenPairWithColorView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('rest_framework.urls')),
    path('api/posts/', include('posts.urls')),
    path('api/auth/login/', ObtainTokenPairWithColorView.as_view()),
    path('auth/auth/refresh/', TokenRefreshView.as_view()),
    path('', include('frontend.urls'))
]
