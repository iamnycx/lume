from rest_framework.viewsets import ModelViewSet
from apps.users.models import User, ProfilePicture
from apps.users.serializers import UserSerializer, ProfilePictureSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfilePictureViewSet(ModelViewSet):
    serializer_class = ProfilePictureSerializer

    def get_serializer_context(self):
        user_id = self.request.user.id
        return {user_id}

    def get_queryset(self):
        return ProfilePicture.objects.filter(user_id=self.request.user.id)
