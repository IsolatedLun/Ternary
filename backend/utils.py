def get_or_none(model, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None


def get_user_by_id(obj):
    from users.models import cUser
    from users.serializers import cUserSerializer

    return cUserSerializer(cUser.objects.get(id=obj.user.id)).data

def model_vote(req_data, model, voted_model):
    model.votes = req_data['votes']
    voted_model.vote_type = req_data['type']

    if req_data['type'] == 'upvote':
        model.user.honor += 10
    else:
        model.user.honor -= 10

    model.save()
    model.user.save()
    voted_model.save()