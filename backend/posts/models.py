from django.db import models
from users.models import cUser

CONTENT_TYPE_CHOICES = [
    ('both', 'Both'),
    ('video', 'Video'),
    ('url', 'Url'),
]

class Post(models.Model):
    title = models.CharField(max_length=64)

    content = models.JSONField()
    content_type = models.CharField(max_length=16, choices=CONTENT_TYPE_CHOICES)

    votes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)

    user = models.ForeignKey(cUser, on_delete=models.CASCADE)

    date_created = models.DateTimeField(auto_now_add=True)