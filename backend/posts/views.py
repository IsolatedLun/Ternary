from backend.communities.models import JoinedCommunity
from utils import get_or_none
from . import models
from . import serializers

from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework import generics

from json import dumps as json_dumps
from responses import OK, ERR


class PostsView(APIView):
    def get(self, req):
        if req.user:
            posts = []

            for community in JoinedCommunity.objects.filter(user_id=req.user.id):
                for _post in models.Post.objects.filter(community_id=community.id):
                    posts.append(_post)

            serialized_posts = serializers.PostPreviewSerializer(
                posts, many=True).data
            return Response(data=serialized_posts, status=OK)
        else:
            queryset = models.Post.objects.all().order_by('-date_created')
            serialized_data = serializers.PostPreviewSerializer(
                queryset, many=True).data

            return Response(data=serialized_data, status=OK)


class PostView(APIView):
    permission_classes = [AllowAny]

    def get(self, req, post_id):
        try:
            post = serializers.PostSerializer(
                models.Post.objects.get(id=post_id)).data

            if req.user:
                voted_post = get_or_none(
                    models.VotedPost, post_id=post_id, user_id=req.user.id)

                if voted_post is not None:
                    post['vote_type'] = voted_post.vote_type
            else:
                post['vote_type'] = 'neutral'

            return Response(data=post, status=OK)
        except Exception as e:
            print(e)
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


class CommentOnPostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id):
        text = req.data['text']

        comment = models.Comment.objects.create(
            text=text, post_id=post_id, user_id=req.user.id)

        return Response(data=serializers.CommentSerializer(comment).data, status=OK)


class VotePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id):
        post = models.Post.objects.get(id=post_id)

        post.votes = req.data['votes']
        post.save()

        voted_post, created = models.VotedPost.objects.get_or_create(
            post_id=post.id, user_id=req.user.id)

        voted_post.vote_type = req.data['type']
        voted_post.save()

        return Response(data={'detail': 'Voted'}, status=OK)
