from responses import OK, ERR
from . import models
from . import serializers
from rest_framework.views import APIView, Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from jwt import decode
from django.conf import settings


def decode_user_id(request_header):
    print(request_header)
    try:
        token = request_header['Authorization'].split(' ')[1]
        return decode(jwt=str(token), key=settings.SECRET_KEY, algorithms=['HS256'])['user_id']
    except:
        return None


class RegisterView(APIView):
    def post(self, req):
        try:
            models.cUser.objects.create(
                email_address=req.POST['email_address'],
                password=make_password(req.POST['password']),
                profile=req.files['profile'],
                username=req.POST['username']
            )

            return Response(data='Created user', status=OK)

        except:
            return Response(data='Something went wrong.', status=ERR)


class JWTLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, req):
        try:
            user = models.cUser.objects.get(
                email_address=req.POST['email_address'])

            if not check_password(req.POST['password'], user.password):
                raise Exception()

            refresh = RefreshToken.for_user(user)

            return Response({
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user': serializers.cUserSerializer(user).data
            }, OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Invalid email or password.'}, ERR)


class JWTAuthenticateView(APIView):
    permission_classes = [AllowAny]

    def post(self, req):
        print(req)
        user = serializers.cUserSerializer(
            models.cUser.objects.get(id=decode_user_id(req.headers))).data

        return Response(data=user, status=OK)


class GetUserById(APIView):
    def get(self, req, user_id):
        try:
            user = models.cUser.objects.get(id=user_id)
            serializer = serializers.cUserSerializer(user).data

            return Response(data=serializer, status=OK)
        except:
            return Response({'detail': 'User does not exist.'}, status=OK)
