from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import LoginView, LogoutView
from allauth.account.views import ConfirmEmailView

# для подтверждения email
class CustomConfirmEmailView(ConfirmEmailView):
    # переопределение метода get, чтобы пометить email как подтвержденный
    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        email_address = self.object.email_address
        email_address.verified = True
        email_address.save()
        return super().get(request, *args, **kwargs)

urlpatterns = [
    # подключение админ панели Django
    path('admin/', admin.site.urls),
    # для подтверждения email
    path('registration/account-confirm-email/<str:key>/', 
         CustomConfirmEmailView.as_view(template_name="email_confirmation.html"), 
         name='account_confirm_email',),
    # для регистрации пользователя
    path('registration/', include('dj_rest_auth.registration.urls')),
    # для входа
    path('login/', LoginView.as_view(), name='rest_login'),
    # для выхода
    path('logout/', LogoutView.as_view(), name='rest_logout'),
]
