from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.TextField()
    start = models.DateTimeField()
    end = models.DateTimeField()
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")
    
    def __str__(self):
        return self.title