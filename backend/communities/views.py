from . import models
from . import serializers

from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from responses import OK, ERR


class RelavantCommunitiesView(generics.ListAPIView):
    queryset = models.Community.objects.all()[:10]
    serializer_class = serializers.CommunitySerializer


class TopCommunityMembersView(APIView):
    def get(self, req, community_id):
        queryset = models.CommunityMember.objects.filter(
            community_id=community_id).order_by('user__honor')[:10]
        serialized = serializers.CommunityMemberSerializer(
            queryset, many=True).data

        return Response(data=serialized, status=OK)


class CommunityView(APIView):
    def get(self, req, community_id):
        try:
            post = serializers.CommunitySerializer(
                models.Community.objects.get(id=community_id)).data

            return Response(data=post, status=OK)
        except:
            return Response(data={'detail': 'Post does not exist.'}, status=ERR)


class JoinCommunityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, community_id):
        community, created = models.JoinedCommunity.objects.get_or_create(
            community_id=community_id, user_id=req.user.id)
        joined = False

        if not created:
            community.delete()
        else:
            joined = True

        return Response(data=joined, status=OK)
