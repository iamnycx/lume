from apps.posts.models import Post
from apps.users.models import User
from rest_framework import status
from model_bakery import baker
import pytest

@pytest.fixture
def create_post(api_client):
    def do_create_post(post):
        return api_client.post('/api/posts/', post)
    return do_create_post

@pytest.fixture
def authenticate_user(api_client):
    def do_authenticate_user(user):
        api_client.force_authenticate(user=user)
    return do_authenticate_user    

@pytest.mark.django_db
class TestCreatePost:
    def test_if_user_is_anonymous_returns_401(self, create_post):
        response = create_post({ 'title': 'a', 'caption': 'b'})

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
class TestRetrievePost:
    def test_if_user_is_anonymous_returns_401(self, api_client):
        post = baker.make(Post)

        response = api_client.get(f'/api/posts/{post.id}/')

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_post_exists_return_200(self, api_client, authenticate_user):
        post = baker.make(Post)
        user = baker.make(User)
        authenticate_user(user)

        response = api_client.get(f'/api/posts/{post.id}/')

        assert response.status_code == status.HTTP_200_OK

        # assert response.data == {
        #     'id': post.id,
        #     'title': post.title,
        #     'caption': post.caption,
        #     'author_id': post.author,
        #     'likes': post.likes,
        #     'dislikes': post.dislikes,
        #     'created_at': post.created_at,
        #     'images': post.images
        # }
