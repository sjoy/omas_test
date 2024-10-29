from django.contrib import admin
from .models import RefAnimalType, RefBreed, Animal, Weighting
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken

# Регистрируем модели в админке
admin.site.register(RefAnimalType)
admin.site.register(RefBreed)
admin.site.register(Animal)
admin.site.register(Weighting)

# Убираем модели социальных аккаунтов(так как не используем, нужны для Allauth)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialApp)
admin.site.unregister(SocialToken)
