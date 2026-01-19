from rest_framework import serializers
from .models import SkinImage, Routine

class SkinImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkinImage
        fields = '__all__'

class RoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routine
        fields = '__all__'
