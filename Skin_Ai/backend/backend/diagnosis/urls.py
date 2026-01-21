from django.urls import path
from .views import AnalyzeSkinVideoView

urlpatterns = [
    # L'adresse sera : http://localhost:8000/api/diagnosis/analyze/
    path('analyze/', AnalyzeSkinVideoView.as_view(), name='analyze-video'),
]