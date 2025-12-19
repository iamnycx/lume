from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from apps.posts.views import PostViewSet

router = DefaultRouter()
router.register('posts', PostViewSet)

# post_image_router = NestedDefaultRouter(router, 'posts', lookup='post')
# post_image_router.register('images', PostImageViewSet, basename='post-images')

urlpatterns = router.urls
