from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AnimalViewSet,
    RefAnimalTypeViewSet,
    RefBreedViewSet,
    WeightingViewSet,
)

# создаем router для автоматической генерации URL
router = DefaultRouter()
# регистрируем представление для справочника типов животных
router.register(r"ref_animal_types", RefAnimalTypeViewSet)
# регистрируем представление для справочника пород
router.register(r"ref_breeds", RefBreedViewSet)
# регистрируем представление для животных
router.register(r"animals", AnimalViewSet)
# регистрируем представление для взвешивания
router.register(r"weightings", WeightingViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
