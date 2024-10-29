from rest_framework import viewsets
from .models import Animal, Weighting
from .serializers import AnimalSerializer, WeightingSerializer

# представление для животных
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

# представление для взвешивания
class WeightingViewSet(viewsets.ModelViewSet):
    serializer_class = WeightingSerializer

    # возвращает только записи пользователя или все записи для администратора
    def get_queryset(self):
        if self.request.user.is_staff:
            return Weighting.objects.all()
        return Weighting.objects.filter(user=self.request.user)

    # сохраняет пользователя при создании записи
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)