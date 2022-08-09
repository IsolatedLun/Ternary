from curses import A_ALTCHARSET
from rest_framework import serializers

from . import models
from utils import get_user_by_id

from json import loads as json_loads


class CommunitySerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField(method_name='get_posts')

    def get_posts(self, obj):
        from posts.models import Post
        from posts.serializers import PostPreviewSerializer

        return PostPreviewSerializer(Post.objects.filter(community_id=obj.id).order_by('-date_created', '-votes'), many=True).data

    class Meta:
        model = models.Community
        fields = '__all__'


class CommunityPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Community
        fields = '__all__'


class CommunityMemberSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')

    def get_user(self, obj):
        return get_user_by_id(obj)

    class Meta:
        model = models.CommunityMember
        fields = '__all__'
