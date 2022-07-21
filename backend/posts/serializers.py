from rest_framework import serializers
from users.models import cUser

from users.serializers import cUserSerializer
from . import models

def get_user_by_id(obj):
    return cUserSerializer(cUser.objects.get(id=obj.user.id)).data

class PostPreviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def get_user(self, obj):
        return get_user_by_id(obj)

    class Meta:
        model = models.Post
        fields = '__all__'