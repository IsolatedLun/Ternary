from consts import MAX_RELEVANT_COMMUNITIES
from . import models
from . import serializers
from utils import get_or_none

from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.db.utils import IntegrityError

from responses import OK, ERR


class RelevantCommunitiesView(APIView):
    def get(self, req):
        serialized_data = None

        if req.user.is_authenticated:
            i = 0
            communities = []
            for community in models.Community.objects.all():
                # If not joined
                if not get_or_none(models.CommunityMember, user_id=req.user.id, community_id=community.id):
                    communities.append(community)
                if i > MAX_RELEVANT_COMMUNITIES:
                    break
                i += 1

            serialized_data = serializers.CommunityPreviewSerializer(
                communities, many=True).data
        else:
            communities = models.Community.objects.all().order_by('members')[
                :MAX_RELEVANT_COMMUNITIES]
            serialized_data = serializers.CommunityPreviewSerializer(
                communities, many=True).data

        return Response(data=serialized_data, status=OK)


class TopCommunityMembersView(APIView):
    def get(self, req, community_id):
        queryset = models.CommunityMember.objects.filter(
            community_id=community_id).order_by('-user__honor')[:10]
        serialized = serializers.CommunityMemberSerializer(
            queryset, many=True).data

        return Response(data=serialized, status=OK)


class CommunityView(APIView):
    def get(self, req, community_id):
        try:
            community = serializers.CommunitySerializer(
                models.Community.objects.get(id=community_id)).data

            if req.user.is_authenticated:
                joined = get_or_none(
                    models.CommunityMember, user_id=req.user.id, community_id=community_id)
                if joined is not None:
                    community['joined'] = True
            else:
                community['joined'] = False

            return Response(data=community, status=OK)
        except Exception as e:
            return Response(data={'detail': 'Community does not exist.'}, status=ERR)


class CreateCommunityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        try:
            community = models.Community.objects.create(
                name=req.data['name'],
                about=req.data['about'],
                profile=req.FILES['profile'],
                banner=req.FILES['banner'],
                members=1
            )

            owner = models.CommunityMember.objects.create(
                community_id=community.id,
                user_id=req.user.id,
                is_owner=True,
                is_moderator=True
            )

            return Response(data={'id': community.id}, status=OK)

        except IntegrityError as e:  # Unique constraint error
            return Response(data={'detail': str(e)}, status=ERR)
        except Exception:
            return Response(status=ERR)


class JoinCommunityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, community_id):
        joined_member, created = models.CommunityMember.objects.get_or_create(
            community_id=community_id, user_id=req.user.id)
        joined = False

        # If already created
        if not created:
            joined_member.community.members -= 1
            joined_member.delete()
        else:
            joined_member.community.members += 1
            joined = True

        joined_member.community.save()
        return Response(data=joined, status=OK)
