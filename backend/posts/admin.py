from django.contrib import admin
from . import models

admin.site.register(models.Post)
admin.site.register(models.Comment)
admin.site.register(models.CommentReply)
admin.site.register(models.VotedPost)
admin.site.register(models.VotedComment)
admin.site.register(models.VotedCommentReply)
