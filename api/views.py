from rest_framework import viewsets
from .models import SkinImage, Routine
from .serializers import SkinImageSerializer, RoutineSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class SkinImageViewSet(viewsets.ModelViewSet):
    queryset = SkinImage.objects.all()
    serializer_class = SkinImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class RoutineViewSet(viewsets.ModelViewSet):
    queryset = Routine.objects.all()
    serializer_class = RoutineSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "API is working"})
