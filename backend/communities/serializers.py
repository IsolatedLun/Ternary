from rest_framework import serializers
from users.models import cUser
from users.serializers import cUserSerializer

from . import models

from json import loads as json_loads


def get_user_by_id(obj):
    return cUserSerializer(cUser.objects.get(id=obj.user.id)).data


class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Community
        fields = '__all__'
