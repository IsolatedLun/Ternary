from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

from . import views

urlpatterns = [
    path('token', views.JWTLoginView.as_view(), name='get-token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh-token'),
    path('authenticate', views.JWTAuthenticateView.as_view(),
         name='post-authenticate'),
    # path('login', views.JWTLoginView.as_view(), name='post-login'),
    # path('register', views.RegisterView.as_view(), name='post-register'),
]
