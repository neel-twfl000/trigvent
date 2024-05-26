from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .import views

router = DefaultRouter()

router.register(r"login", views.LoginViewSet, basename="login")
router.register(r"register", views.RegisterViewSet, basename="register")
router.register(r"project", views.ProjectViewSet, basename="project")
router.register(r"task", views.TaskViewSet, basename="task")

urlpatterns = [
    path('', include(router.urls)),
]
