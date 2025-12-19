from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.posts.models import Post, PostResponse, Responses
from apps.posts.serializers import PostSerializer

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    pagination_class = PageNumberPagination
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def react(self, request, pk=None):
        post = self.get_object()
        response_value = request.data.get("response")
        
        if response_value not in (Responses.LIKE, Responses.DISLIKE):
            return Response(
                {"detail": "response must be 'like' or 'dislike'"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        return Response({"detail": "reaction updated"})

class SelfPostViewSet(ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user.id).order_by('-created_at')

