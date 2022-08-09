from rest_framework import serializers
from django.apps import apps

from . import models
from consts import MAX_RELEVANT_COMMUNITIES
from posts.serializers import PostPreviewSerializer
from communities.serializers import CommunityPreviewSerializer


class cUserSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

    class Meta:
        model = models.cUser
        exclude = ['password', 'email',
                   'email_address', 'first_name', 'last_name']


class cUserViewSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField(method_name='get_posts')
    communities = serializers.SerializerMethodField(
        method_name='get_communities')

    def get_posts(self, obj):
        postModel = apps.get_model('posts', 'Post')

        return PostPreviewSerializer(postModel.objects.filter(user_id=obj.id), many=True).data

    def get_communities(self, obj):
        communityModel = apps.get_model('communities', 'CommunityMember')

        return CommunityPreviewSerializer(
            [x.community for x in communityModel.objects.filter(user_id=obj.id)[
                :MAX_RELEVANT_COMMUNITIES]
             ],
            many=True
        ).data

    class Meta:
        model = models.cUser
        exclude = ['password', 'email',
                   'email_address', 'first_name', 'last_name']
