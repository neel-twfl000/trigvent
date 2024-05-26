from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializer import (
    UserSerializer, Project, 
    ProjectSerializer,ProjectRetriveSerializer,
    Task, TaskSerializer, User
)

from django.db.models import F, Count

class LoginViewSet(ViewSet):

    def create(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response({"detail":"Try Again!"}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = UserSerializer(user)
        return Response(serializer.data)

class RegisterViewSet(ViewSet):

    def create(self, request):
        data = {"detail":{}}
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if username is None or len(username) <3:
            data["detail"]["username"] = "Invalid Username"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            data["detail"]["username"] = "Username already used"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        
        if email is None or len(email) <5:
            data["detail"]["email"] = "Invalid Email Id"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            data["detail"]["email"] = "Email already used"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        
        if password is None or len(password) <5:
            data["detail"]["password"] = "Password must be 5 digit"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=username, email=email, password=password)
        return Response({"detail":"Account Created"}, status=status.HTTP_201_CREATED)



class ProjectViewSet(ModelViewSet):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    model = Project
    serializer_class = ProjectSerializer
    queryset = model.objects

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProjectRetriveSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user).annotate(
            total_task=Count('task')
        )
    
class TaskViewSet(ModelViewSet):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    model = Task
    serializer_class = TaskSerializer
    queryset = model.objects

    def get_queryset(self):
        queryset = self.queryset.filter(project__owner=self.request.user).annotate(
            project_name=F('project__name')
        )
        return queryset
