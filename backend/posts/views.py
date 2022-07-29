from . import models
from . import serializers

from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from json import dumps as json_dumps
from responses import OK, ERR


class PostsView(generics.ListAPIView):
    queryset = models.Post.objects.all().order_by('-date_created')
    serializer_class = serializers.PostPreviewSerializer


class PostView(APIView):
    def get(self, req, post_id):
        try:
            post = serializers.PostSerializer(
                models.Post.objects.get(id=post_id)).data

            return Response(data=post, status=200)
        except:
            return Response(data={'detail': 'Post does not exist.'}, status=OK)


class CreatePostView(APIView):
    def post(self, req):
        post_data = req.POST
        files = req.FILES

        post = models.Post.objects.create(
            title=post_data['title'], user_id=1, content_type=post_data['content_type'])

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
    def post(self, req, post_id):
        text = req.POST['text']
        comment = models.Comment.objects.create(
            text=text, post_id=post_id, user_id=1)

        return Response(data=serializers.CommentSerializer(comment).data, status=OK)


class VotePostView(APIView):
    def post(self, req, post_id):
        post = models.Post.objects.get(id=post_id)

        post.votes = req.data['votes']
        post.save()

        return Response(data={'detail': 'Post voted.'}, status=OK)
