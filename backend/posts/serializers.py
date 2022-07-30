from rest_framework import serializers
from users.models import cUser

from users.serializers import cUserSerializer
from . import models

from json import loads as json_loads


def get_user_by_id(obj):
    return cUserSerializer(cUser.objects.get(id=obj.user.id)).data


class PostPreviewSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    community = serializers.SerializerMethodField(method_name='get_community')
    user = serializers.SerializerMethodField(method_name='get_user')
    comments = serializers.SerializerMethodField(method_name='get_comments')
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def get_user(self, obj):
        return get_user_by_id(obj)

    def get_comments(self, obj):
        return models.Comment.objects.filter(post_id=obj.id).count()

    def get_content(self, obj):
        if obj.content_type == 'image':
            return json_loads(obj.content)
        return obj.content

    def get_community(self, obj):
        from communities.serializers import CommunityPreviewSerializer

        if(obj.community):
            return CommunityPreviewSerializer(obj.community).data
        return 0

    class Meta:
        model = models.Post
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    user = serializers.SerializerMethodField(method_name='get_user')
    comments = serializers.SerializerMethodField(method_name='get_comments')
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def get_user(self, obj):
        return get_user_by_id(obj)

    def get_comments(self, obj):
        return CommentSerializer(models.Comment.objects.filter(post_id=obj.id), many=True).data

    def get_content(self, obj):
        if obj.content_type == 'image':
            return json_loads(obj.content)
        return obj.content

    class Meta:
        model = models.Post
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')

    def get_user(self, obj):
        return get_user_by_id(obj)

    class Meta:
        model = models.Comment
        fields = '__all__'
