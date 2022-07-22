from . import models
from . import serializers

from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

class PostsView(generics.ListAPIView):
    queryset = models.Post.objects.all().order_by('-date_created')
    serializer_class = serializers.PostPreviewSerializer

class PostView(APIView):
    def get(self, req, post_id):
        try:
            post = serializers.PostSerializer(models.Post.objects.get(id=post_id)).data
        
            return Response(data=post, status=200)
        except:
            return Response(data={'detail': 'Post does not exist.'}, status=404)