from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='get-feed'),
]