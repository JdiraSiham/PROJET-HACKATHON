from django.urls import path
from .views import AnalyzeSkinVideoView

urlpatterns = [
    path('analyze/', AnalyzeSkinVideoView.as_view(), name='analyze-video'),
]


