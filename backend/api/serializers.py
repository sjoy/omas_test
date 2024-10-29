from rest_framework import serializers
from .models import Animal, Weighting, RefAnimalType, RefBreed

# сериализатор для справочника типов животных
class RefAnimalTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefAnimalType
        fields = '__all__'

# сериализатор для справочника пород
class RefBreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefBreed
        fields = '__all__'

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
