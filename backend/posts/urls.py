from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='get-feed'),
    path('<int:post_id>', views.PostView.as_view(), name='get-post'),

    path('<int:post_id>/comment',
         views.CommentOnPostView.as_view(), name='comment-on-post'),
    path('<int:post_id>/comment/<int:comment_id>/reply',
         views.ReplyOnCommentView.as_view(), name='reply-on-comment'),

    path('<int:post_id>/vote/post',
         views.VotePostView.as_view(), name='vote-post'),

    path('<int:post_id>/vote/comment/<int:comment_id>',
         views.VoteCommentView.as_view(), name='vote-comment'),

    path('<int:post_id>/vote/comment/<int:comment_id>/reply/<int:reply_id>',
         views.VoteCommentReplyView.as_view(), name='vote-comment-reply'),

    path('create', views.CreatePostView.as_view(), name='create-post'),
]
