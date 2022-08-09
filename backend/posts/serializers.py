from rest_framework import serializers
from utils import get_or_none, get_user_by_id

from . import models

from json import loads as json_loads


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
    vote_type = serializers.SerializerMethodField(method_name='get_vote_type')

    def get_user(self, obj):
        return get_user_by_id(obj)

    def get_comments(self, obj):
        user_id = self.context['user_id']
        post_id = self.context['post_id']

        return CommentSerializer(
            models.Comment.objects.filter(post_id=obj.id),
            context={'user_id': user_id, 'post_id': post_id},
            many=True,
        ).data

    def get_content(self, obj):
        if obj.content_type == 'image':
            return json_loads(obj.content)
        return obj.content

    def get_vote_type(self, obj):
        user_id = self.context['user_id']
        post_id = self.context['post_id']

        voted_post = get_or_none(
            models.VotedPost, user_id=user_id, post_id=post_id)

        if user_id and voted_post:
            return voted_post.vote_type
        else:
            return 'neutral'

    class Meta:
        model = models.Post
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')
    vote_type = serializers.SerializerMethodField(method_name='get_vote_type')
    replies = serializers.SerializerMethodField(method_name='get_replies')

    def get_user(self, obj):
        return get_user_by_id(obj)

    def get_vote_type(self, obj):
        user_id = self.context['user_id']
        post_id = self.context['post_id']

        voted_comment = get_or_none(
            models.VotedComment, user_id=user_id, post_id=post_id)

        if user_id and voted_comment:
            return voted_comment.vote_type
        else:
            return 'neutral'

    def get_replies(self, obj):
        post_id = self.context['post_id']

        return CommentReplySerializer(
            models.CommentReply.objects.filter(
                post_id=post_id, comment_id=obj.id),
            context={'user_id': self.context['user_id'],
                     'post_id': post_id, 'comment_id': obj.id},
            many=True
        ).data

    class Meta:
        model = models.Comment
        fields = '__all__'


class CommentReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')
    vote_type = serializers.SerializerMethodField(method_name='get_vote_type')

    def get_user(self, obj):
        return get_user_by_id(obj)

    def get_vote_type(self, obj):
        user_id = self.context['user_id']
        post_id = self.context['post_id']
        comment_id = self.context['comment_id']

        voted_comment = get_or_none(
            models.VotedCommentReply, user_id=user_id, post_id=post_id, comment_id=comment_id, reply_id=obj.id)

        if user_id and voted_comment:
            return voted_comment.vote_type
        else:
            return 'neutral'

    class Meta:
        model = models.CommentReply
        fields = '__all__'
