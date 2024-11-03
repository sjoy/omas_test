from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.contrib import admin
from django.urls import include, path
from rest_framework.permissions import AllowAny
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from .views import CustomConfirmEmailView

# Set up the schema view for Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="OMAS TZ",
        default_version="v1",
        description="API documentation for OMAS TZ",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="joy191211@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

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
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path(
        "redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
]
