from django.contrib import admin
from .models import RefAnimalType, RefBreed, Animal, Weighting

# Register the models with the admin site
admin.site.register(RefAnimalType)
admin.site.register(RefBreed)
admin.site.register(Animal)
admin.site.register(Weighting)