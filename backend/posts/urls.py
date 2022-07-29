from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='get-feed'),
    path('<int:post_id>', views.PostView.as_view(), name='get-post'),

    path('<int:post_id>/comment',
         views.CommentOnPostView.as_view(), name='comment-on-post'),

    path('<int:post_id>/vote',
         views.VotePostView.as_view(), name='vote-post'),

    path('create', views.CreatePostView.as_view(), name='create-post'),
]
