from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RefAnimalTypeViewSet, RefBreedViewSet, AnimalViewSet, WeightingViewSet

router = DefaultRouter()
router.register(r'ref_animal_types', RefAnimalTypeViewSet)
router.register(r'ref_breeds', RefBreedViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'weightings', WeightingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]