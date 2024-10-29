from rest_framework import serializers
from .models import Animal, Weighting

# сериализатор для модели Animal
class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'

# сериализатор для модели Weighting
class WeightingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weighting
        fields = '__all__'