from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.contrib import admin
from django.urls import include, path

from .views import CustomConfirmEmailView

urlpatterns = [
    # подключение админ панели Django
    path("admin/", admin.site.urls),
    # для подтверждения email
    path(
        "auth/registration/account-confirm-email/<str:key>/",
        CustomConfirmEmailView.as_view(
            template_name="email_confirmation.html",
        ),
        name="account_confirm_email",
    ),
    # для регистрации пользователя
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    # для входа
    path("auth/login/", LoginView.as_view(), name="rest_login"),
    # для выхода
    path("auth/logout/", LogoutView.as_view(), name="rest_logout"),
    # для получения и обновления данных пользователя
    path("auth/user/", UserDetailsView.as_view(), name="rest_user_details"),
    # для работы с API
    path("api/", include("api.urls")),
]
