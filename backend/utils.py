from users.models import cUser
from users.serializers import cUserSerializer


def get_or_none(model, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None


def get_user_by_id(obj):
    return cUserSerializer(cUser.objects.get(id=obj.user.id)).data
