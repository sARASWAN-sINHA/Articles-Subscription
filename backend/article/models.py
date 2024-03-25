from django.utils import timezone
from django.db import models
import uuid


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add  = True)
    updated_at = models.DateTimeField(default       = timezone.now)

    class Meta:
        abstract = True

class Article(BaseModel):

    article_uuid  = models.UUIDField(
                                    default     =   uuid.uuid4, 
                                    editable    =   False,
                                    unique      = True    
                                )
    
    writer      = models.ForeignKey(
                                    to          =    'account.CustomUser' , 
                                    db_column   =    "writer",
                                    on_delete   =   models.CASCADE,
                                )
    
    title       = models.CharField(
                                    max_length  =   100,
                                    db_column   =   "title"
                                )
    
    content     = models.TextField(max_length   = 1500)
    
    is_premium  = models.BooleanField(
                                        default         =   False,
                                        db_column       =   'premium', 
                                        verbose_name    =   'Is Premium',
                                    )
    
    def __str__(self) -> str:
        return f'{self.title} written by {self.writer.first_name} {self.writer.last_name}'