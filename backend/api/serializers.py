from rest_framework import serializers

from .models import Animal, RefAnimalType, RefBreed, Weighting


# сериализатор для справочника типов животных
class RefAnimalTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefAnimalType
        fields = "__all__"


# сериализатор для справочника пород
class RefBreedSerializer(serializers.ModelSerializer):
    # Accepts only the id of the animal type on write (POST/PUT)
    animal_type = serializers.PrimaryKeyRelatedField(
        queryset=RefAnimalType.objects.all(),
        write_only=True
    )
    # Serializes the full animal type object on read (GET)
    animal_type_details = RefAnimalTypeSerializer(source='animal_type', read_only=True)

    class Meta:
        model = RefBreed
        fields = "__all__"


# Сериализатор для чтения (response) cправочника животных
class AnimalReadSerializer(serializers.ModelSerializer):
    breed = RefBreedSerializer()
    parent = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        allow_null=True,
    )

    class Meta:
        model = Animal
        fields = "__all__"


# Сериализатор для записи/обновление данных cправочника животных
class AnimalWriteSerializer(serializers.ModelSerializer):
    breed = serializers.PrimaryKeyRelatedField(queryset=RefBreed.objects.all())
    parent = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        allow_null=True,
    )

    class Meta:
        model = Animal
        fields = "__all__"


# сериализатор для модели Weighting
class WeightingSerializer(serializers.ModelSerializer):
    # Возвращает строковое представление животного
    animal_name = serializers.StringRelatedField(source="animal")

    class Meta:
        model = Weighting
        fields = ["id", "animal", "animal_name", "weight_date", "weight"]
