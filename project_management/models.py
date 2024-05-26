from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class BaseModel(models.Model):
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Project(BaseModel):
    name = models.CharField(max_length=130)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Task(BaseModel):
    title = models.CharField(max_length=130)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="task")

