from rest_framework import serializers 
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken
from ..models import Project, Task

class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'token']
    
    def get_token(self, obj):
        token = AccessToken.for_user(obj)
        return [str(token)]

class ProjectSerializer(serializers.ModelSerializer):
    total_task = serializers.IntegerField(read_only=True)
    class Meta:
        model = Project
        fields = '__all__'
    
    def to_internal_value(self, data):
        request = self.context['request']
        if request.method == "POST":
            data['owner'] = request.user.id
        return super().to_internal_value(data)

class TaskSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(read_only=True)
    class Meta:
        model = Task
        fields = '__all__'

class ProjectRetriveSerializer(ProjectSerializer):
    task = TaskSerializer(many=True)