from django.urls import include, path
from rest_framework import routers

from .views import ArticleViewSet


routers = routers.DefaultRouter(trailing_slash = False)
routers.register('', ArticleViewSet, basename="articles-view")


urlpatterns = [
    path('', include(routers.urls))
]