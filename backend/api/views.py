from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Animal, RefAnimalType, RefBreed, Weighting
from .serializers import (
    AnimalSerializer,
    RefAnimalTypeSerializer,
    RefBreedSerializer,
    WeightingSerializer,
)


# представление для справочника типов животных
class RefAnimalTypeViewSet(viewsets.ModelViewSet):
    queryset = RefAnimalType.objects.all()
    serializer_class = RefAnimalTypeSerializer
    permission_classes = [IsAuthenticated]


# представление для справочника пород
class RefBreedViewSet(viewsets.ModelViewSet):
    queryset = RefBreed.objects.all()
    serializer_class = RefBreedSerializer
    permission_classes = [IsAuthenticated]


# представление для животных
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [IsAuthenticated]


# представление для взвешивания
class WeightingViewSet(viewsets.ModelViewSet):
    queryset = Weighting.objects.all()
    serializer_class = WeightingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # если пользователь администратор, возвращаем все записи
        if self.request.user.is_staff:
            return Weighting.objects.all()
        # иначе возвращаем записи пользователя
        return Weighting.objects.filter(user=self.request.user)

    # сохраняет пользователя при создании записи
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
