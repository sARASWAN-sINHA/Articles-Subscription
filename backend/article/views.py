from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .permissions import IsArticleAuthor, IsWriter

from .models import Article
from .serializers import ArticleSerialzier

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerialzier

    def get_permissions(self):
        permission_classes = []

        if self.action == 'create':
             permission_classes += [IsAuthenticated, IsWriter]

        if self.action in {"update", "partial_update", "destroy"}:
            permission_classes += [IsAuthenticated , IsArticleAuthor]

        elif self.action == {"list", "retrieve"}:
            permission_classes += [IsAuthenticated]

        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="Client").exists():
            return Article.objects.all()
        return Article.objects.filter(writer = user.id)
    

    def create(self, request, *args, **kwargs):
        request.data.pop('writer_id', None)
        request.data["writer_id"]= request.user.id
        return super().create(request, *args, **kwargs)
    
    
        



         


            
            

