from django.db import models
from django.core.validators import FileExtensionValidator
from django.contrib.contenttypes.fields import GenericForeignKey
from communities.models import Community

CONTENT_TYPE_CHOICES = [
    ('text', 'Text'),
    ('image', 'Image'),
    ('video', 'Video'),
    ('url', 'Url'),
]


class Post(models.Model):
    title = models.CharField(max_length=64)

    content = models.TextField()
    content_type = models.CharField(
        max_length=16, choices=CONTENT_TYPE_CHOICES)

    votes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)

    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    community = models.ForeignKey(
        Community, on_delete=models.CASCADE, null=True, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/%Y',
                              validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg', 'webp', 'gif'])])

    date_created = models.DateTimeField(auto_now_add=True)


class PostVideo(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    video = models.FileField(upload_to='posts/%Y',
                             validators=[FileExtensionValidator(allowed_extensions=['mov', 'avi', 'mp4', 'webm', 'mkv'])])

    date_created = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)

    text = models.CharField(max_length=4096)

    votes = models.IntegerField(default=0)
    replies = models.IntegerField(default=0)

    date_created = models.DateTimeField(auto_now_add=True)


class CommentReply(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    text = models.CharField(max_length=4096)

    # id="comment-id" || id="comment-id-reply-id"
    # Used for highlighting in the frontend
    reply_to = models.CharField(max_length=64, default='')

    votes = models.IntegerField(default=0)

    date_created = models.DateTimeField(auto_now_add=True)


# =================
# Voted Models
# =================
VOTE_TYPE_CHOICES = [
    ('upvote', 'upvote'),
    ('downvote', 'downvote'),
    ('neutral', 'neutral'),
]


class VotedPost(models.Model):
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    vote_type = models.CharField(
        max_length=16, choices=VOTE_TYPE_CHOICES)


class VotedComment(models.Model):
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    vote_type = models.CharField(
        max_length=16, choices=VOTE_TYPE_CHOICES)


class VotedCommentReply(models.Model):
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    reply = models.ForeignKey(CommentReply, on_delete=models.CASCADE)

    vote_type = models.CharField(
        max_length=16, choices=VOTE_TYPE_CHOICES)
