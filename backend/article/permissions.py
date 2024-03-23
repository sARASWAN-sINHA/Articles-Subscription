from rest_framework.permissions import BasePermission

class IsWriter(BasePermission):
    message = "Only writers can create articles!"
    def has_permission(self, request, view):
        user = request.user
        return user.groups.filter(name="Writer").exists()
    
class IsClient(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.groups.filter(name="Client").exists()
    
class IsArticleAuthor(BasePermission):
    message = 'Only the author can perform this action.'
    def has_object_permission(self, request, view, obj):      
        return obj.writer.id == request.user.id

        

