from django.contrib import admin
from .models import RefAnimalType, RefBreed, Animal, Weighting
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken

# Register the models with the admin site
admin.site.register(RefAnimalType)
admin.site.register(RefBreed)
admin.site.register(Animal)
admin.site.register(Weighting)

# Unregister the SocialAccount model to remove it from the admin panel
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialApp)
admin.site.unregister(SocialToken)