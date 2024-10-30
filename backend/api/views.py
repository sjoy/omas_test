from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from rest_framework.response import Response

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

    # добавляем проверку на логику разрешений для запросов PUT
    def update(self, request, *args, **kwargs):
        obj_id = kwargs.get('pk')
        try:
            instance = Weighting.objects.get(id=obj_id)
        except Weighting.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        # Разрешаем редактирование если пользователь админ или автор записи
        if request.user.is_staff or instance.user == request.user:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data)
        
        raise PermissionDenied("You do not have permission to update this record.")
    
    def destroy(self, request, *args, **kwargs):
        obj_id = kwargs.get('pk')
        try:
            instance = Weighting.objects.get(id=obj_id)
        except Weighting.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        
        if request.user.is_staff or instance.user == request.user:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        raise PermissionDenied("You do not have permission to delete this record.")
