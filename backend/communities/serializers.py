from rest_framework import serializers
from users.models import cUser
from users.serializers import cUserSerializer

from . import models

from json import loads as json_loads


def get_user_by_id(obj):
    return cUserSerializer(cUser.objects.get(id=obj.user.id)).data


class CommunitySerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField(method_name='get_posts')

    def get_posts(self, obj):
        from posts.models import Post
        from posts.serializers import PostPreviewSerializer

        return PostPreviewSerializer(Post.objects.filter(community_id=obj.id), many=True).data

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
