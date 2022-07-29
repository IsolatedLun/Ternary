from django.db import models


class Community(models.Model):
    name = models.CharField(max_length=64)

    profile = models.ImageField(upload_to='communities/profiles')
    banner = models.ImageField(upload_to='communities/banners')

    members = models.PositiveIntegerField(default=0)

    date_created = models.DateTimeField(auto_now_add=True)
