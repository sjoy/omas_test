from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import LoginView, LogoutView

urlpatterns = [
    # подключение админ панели Django
    path('admin/', admin.site.urls),
    # для регистрации пользователя
    path('registration/', include('dj_rest_auth.registration.urls')),
    # для входа
    path('login/', LoginView.as_view(), name='rest_login'),
    # для выхода
    path('logout/', LogoutView.as_view(), name='rest_logout'),
]
