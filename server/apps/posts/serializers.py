from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.posts.models import Post, PostResponse, Responses

User = get_user_model()

class PostResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostResponse
        fields = ["id", "post", "response"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'avatar']

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    dislike_count = serializers.IntegerField(read_only=True)
    my_response = serializers.SerializerMethodField()
        
    class Meta:
        model = Post
        fields = [ 'id', 'caption', 'like_count', 'dislike_count', 'image', 'author', 'created_at', 'my_response']
        read_only_fields = ['likes', 'dislikes', 'author', 'created_at']
        
        
    def get_my_response(self, obj):
        request = self.context.get("request")
        if request is None or request.user.is_anonymous:
            return None
        pr = obj.responses.filter(user=request.user).first()
        return pr.response if pr else None
