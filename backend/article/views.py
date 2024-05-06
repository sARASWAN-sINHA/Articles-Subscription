from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .permissions import IsArticleAuthor, IsWriter

from .models import Article
from .serializers import ArticleSerialzier


class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerialzier

    def get_permissions(self):
        permission_classes = []

        if self.action == "create":
            permission_classes += [IsAuthenticated, IsWriter]

        if self.action in {"update", "partial_update", "destroy"}:
            permission_classes += [IsAuthenticated, IsArticleAuthor]

        elif self.action in {"list", "retrieve"}:
            permission_classes += [IsAuthenticated]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        user = self.request.user

        # if user is a client
        if user.groups.filter(name="Client").exists():
            try:
                user_latest_subscription = user.latest_subscription()

                # if client user has active subscription
                if user_latest_subscription.is_active:

                    '''
                        client user's active subscription is of type "Standard" 
                        then fetch articles which are only of type "Standard" i.e. is_premium=False
                    '''
                    if user.latest_subscription().type == "STD":
                        return Article.objects.filter(is_premium=False)
                    '''
                        else user's active subscription is of type "Premium"
                        Hence return articles of type "Standard" and "Premium", i.e. all articles
                    '''
                    return Article.objects.all()
            except Exception as e:
                return Article.objects.none()
            
        # user is a writer, return only those articles written by him/her. 
        return Article.objects.filter(writer=user.id)

    def create(self, request, *args, **kwargs):
        request.data.pop("writer_id", None)
        request.data["writer_id"] = request.user.id
        return super().create(request, *args, **kwargs)
