from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='get-feed'),
    path('<int:post_id>', views.PostView.as_view(), name='get-post')
]