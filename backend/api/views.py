from rest_framework import status, viewsets
from rest_framework.exceptions import PermissionDenied
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


# представление для справочника пород
class RefBreedViewSet(viewsets.ModelViewSet):
    queryset = RefBreed.objects.all()
    serializer_class = RefBreedSerializer


# представление для животных
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


# представление для взвешивания
class WeightingViewSet(viewsets.ModelViewSet):
    queryset = Weighting.objects.all()
    serializer_class = WeightingSerializer

    def get_queryset(self):
        # Получаем pk из параметров запроса
        obj_id = self.kwargs.get("pk")

        # если пользователь администратор, возвращаем все записи
        if self.request.user.is_staff:
            return Weighting.objects.all()

        # если pk не указан, возвращаем записи пользователя
        if obj_id is None:
            return Weighting.objects.filter(user=self.request.user)

        # Пытаемся получить запись
        try:
            instance = Weighting.objects.get(id=obj_id)
        except Weighting.DoesNotExist:
            # Возвращаем ошибку если запись не найдена
            raise PermissionDenied(detail="Not found.")

        # если запись принадлежит текущему пользователю, возвращаем её
        if instance.user == self.request.user:
            return Weighting.objects.filter(id=obj_id)

        # Возвращаем ошибку если у пользователя нет прав на просмотр записи
        raise PermissionDenied(
            "You do not have permission to view this record.",
        )

    # сохраняет пользователя при создании записи
    def perform_create(self, serializer):
        # сохраняем запись и передаем пользователя
        serializer.save(user=self.request.user)

    # добавляем проверку на логику разрешений для запросов PUT
    def update(self, request, *args, **kwargs):
        # Получаем pk из параметров запроса
        obj_id = kwargs.get("pk")
        try:
            # Пытаемся получить запись
            instance = Weighting.objects.get(id=obj_id)
        except Weighting.DoesNotExist:
            # Возвращаем ошибку если запись не найдена
            return Response(
                {"detail": "Not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Разрешаем редактирование если пользователь админ или автор записи
        if request.user.is_staff or instance.user == request.user:
            # Проверяем переданные данные
            serializer = self.get_serializer(
                instance,
                data=request.data,
                partial=True,
            )
            # Если данные валидны, сохраняем запись
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Возвращаем обновленную запись
            return Response(serializer.data)

        # Возвращаем ошибку если у пользователя нет прав на редактирование
        raise PermissionDenied(
            "You do not have permission to update this record.",
        )

    def destroy(self, request, *args, **kwargs):
        obj_id = kwargs.get("pk")
        try:
            instance = Weighting.objects.get(id=obj_id)
        except Weighting.DoesNotExist:
            return Response(
                {"detail": "Not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if request.user.is_staff or instance.user == request.user:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        raise PermissionDenied(
            "You do not have permission to delete this record.",
        )
