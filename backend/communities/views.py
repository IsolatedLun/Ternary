from . import models
from . import serializers

from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from json import dumps as json_dumps
from responses import OK, ERR


class RelavantCommunitiesView(generics.ListAPIView):
    queryset = models.Community.objects.all()[:10]
    serializer_class = serializers.CommunitySerializer


class CommunityView(APIView):
    def get(self, req, community_id):
        try:
            post = serializers.CommunitySerializer(
                models.Community.objects.get(id=community_id)).data

            return Response(data=post, status=OK)
        except:
            return Response(data={'detail': 'Post does not exist.'}, status=ERR)
