from . import models
from . import serializers

from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

class PostsView(generics.ListAPIView):
    queryset = models.Post.objects.all().order_by('-date_created')
    serializer_class = serializers.PostPreviewSerializer