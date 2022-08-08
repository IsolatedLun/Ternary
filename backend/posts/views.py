from communities.models import CommunityMember
from utils import get_or_none
from . import models
from . import serializers

from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from json import dumps as json_dumps
from responses import OK, ERR


class PostsView(APIView):
    permission_classes = [AllowAny]

    def get(self, req):
        if req.user and req.user.is_authenticated:
            posts = models.Post.objects.filter(user_id=req.user.id)

            for joined in CommunityMember.objects.filter(user_id=req.user.id):
                posts = posts.union(models.Post.objects.filter(
                    community_id=joined.community.id))

            serialized_data = serializers.PostPreviewSerializer(
                posts.order_by('-date_created', '-votes'), many=True).data
            return Response(data=serialized_data, status=OK)
        else:
            queryset = models.Post.objects.all().order_by('-date_created', '-votes')
            serialized_data = serializers.PostPreviewSerializer(
                queryset, many=True).data

            return Response(data=serialized_data, status=OK)


class PostView(APIView):
    permission_classes = [AllowAny]

    def get(self, req, post_id):
        try:
            user_id = req.user.id if req.user.is_authenticated else None

            post = serializers.PostSerializer(
                models.Post.objects.get(id=post_id),
                context={'user_id': user_id, 'post_id': post_id}
            ).data

            return Response(data=post, status=OK)
        except Exception as e:
            return Response(data={'detail': 'Post does not exist.'}, status=ERR)


class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        post_data = req.POST
        files = req.FILES

        community_id = int(post_data['communityId'])
        if(community_id > 0):
            post = models.Post.objects.create(
                title=post_data['title'], user_id=req.user.id,
                content_type=post_data['content_type'],
                community_id=community_id
            )
        else:
            post = models.Post.objects.create(
                title=post_data['title'], user_id=req.user.id, content_type=post_data['content_type'])

        if post_data['content_type'] == 'image':
            image_urls = []
            for file in files.values():
                image_urls.append(models.PostImage.objects.create(
                    post_id=post.id, image=file).image.url)
            post.content = json_dumps(image_urls)

        elif post_data['content_type'] == 'video':
            file = files['content']

            video = models.PostVideo.objects.create(
                post_id=post.id, video=file)
            post.content = video.video.url

        else:
            post.content = post_data['content']

        post.save()
        return Response(data={'id': post.id}, status=OK)


def model_vote(req_data, model, voted_model):
    model.votes = req_data['votes']
    voted_model.vote_type = req_data['type']

    model.save()
    voted_model.save()


class CommentOnPostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id):
        text = req.data['text']

        comment = models.Comment.objects.create(
            text=text, post_id=post_id, user_id=req.user.id)

        return Response(data=serializers.CommentSerializer(comment).data, status=OK)


class ReplyOnCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id, comment_id):
        text = req.data['text']
        reply_to = ''

        reply = models.CommentReply.objects.create(
            text=text, post_id=post_id, user_id=req.user.id, comment_id=comment_id, reply_to=reply_to)

        if req.data['type'] == 'comment':
            reply_to = f'{reply.comment.user.username}-comment-{comment_id}'
        if req.data['type'] == 'reply':
            reply_to = f'{reply.user.username}-comment-{comment_id}-reply-' + \
                req.data['to_reply_id']

        reply.reply_to = reply_to
        reply.save()

        serialized_reply = serializers.CommentReplySerializer(
            reply,
            context={'user_id': req.user.id,
                     'post_id': post_id, 'comment_id': comment_id},
        ).data

        return Response(data=serialized_reply, status=OK)


class VotePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id):
        post = models.Post.objects.get(id=post_id)
        voted_post, created = models.VotedPost.objects.get_or_create(
            post_id=post.id, user_id=req.user.id)

        model_vote(req.data, post, voted_post)
        return Response(status=OK)


class VoteCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id, comment_id):
        comment = models.Comment.objects.get(post_id=post_id, id=comment_id)
        voted_comment, created = models.VotedComment.objects.get_or_create(
            comment_id=comment_id, user_id=req.user.id, post_id=post_id)

        model_vote(req.data, comment, voted_comment)
        return Response(status=OK)


class VoteCommentReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id, comment_id, reply_id):
        comment = models.CommentReply.objects.get(
            post_id=post_id, comment_id=comment_id, id=reply_id)

        voted_comment, created = models.VotedCommentReply.objects.get_or_create(
            reply_id=reply_id, comment_id=comment_id, user_id=req.user.id, post_id=post_id)

        model_vote(req.data, comment, voted_comment)
        return Response(status=OK)
