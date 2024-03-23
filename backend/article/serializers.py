from rest_framework import serializers

from .models import Article
from account.serializers import CustomUserSerializer

class ArticleSerialzier(serializers.ModelSerializer):
    writer_id   = serializers.IntegerField(write_only = True)
    writer      = CustomUserSerializer(read_only = True)
    class Meta:
        model = Article
        fields = ('id', 'article_uuid', 'title', 'content', 'is_premium', 'created_at', 'updated_at', 'writer', 'writer_id')
    
    def to_representation(self, instance):
        instance                    = super().to_representation(instance)
        article_writer              = instance.pop('writer')
        article_writer_first_name   = article_writer.get('first_name', "Anonymous") 
        article_writer_last_name    = str(article_writer.get('last_name'))
        article_writer_full_name    = article_writer_first_name + (" " + article_writer_last_name if article_writer_last_name !="None" else "")
        instance['writer']          = article_writer_full_name 
        return instance
        