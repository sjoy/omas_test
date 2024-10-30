from rest_framework import serializers

from .models import Animal, RefAnimalType, RefBreed, Weighting


# сериализатор для справочника типов животных
class RefAnimalTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefAnimalType
        fields = "__all__"


# сериализатор для справочника пород
class RefBreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefBreed
        fields = "__all__"


# сериализатор для модели Animal
class AnimalSerializer(serializers.ModelSerializer):
    user = (
        serializers.StringRelatedField()
    )  # Возвращает строковое представление пользователя

    class Meta:
        model = Animal
        fields = "__all__"


# сериализатор для модели Weighting
class WeightingSerializer(serializers.ModelSerializer):
    animal = (
        serializers.StringRelatedField()
    )  # Возвращает строковое представление животного
    user = (
        serializers.StringRelatedField()
    )  # Возвращает строковое представление пользователя

    class Meta:
        model = Weighting
        fields = "__all__"
