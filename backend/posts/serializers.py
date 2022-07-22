from rest_framework import serializers
from users.models import cUser

from users.serializers import cUserSerializer
from . import models

def get_user_by_id(obj):
    return cUserSerializer(cUser.objects.get(id=obj.user.id)).data

class PostPreviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')
    comments = serializers.SerializerMethodField(method_name='get_comments')
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def get_user(self, obj):
        return get_user_by_id(obj)

    def get_comments(self, obj):
        return models.Comment.objects.filter(post_id=obj.id).count()

    class Meta:
        model = models.Post
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')
    comments = serializers.SerializerMethodField(method_name='get_comments')
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def get_user(self, obj):
        return get_user_by_id(obj)

    def get_comments(self, obj):
        return CommentSerializer(models.Comment.objects.filter(post_id=obj.id), many=True).data

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