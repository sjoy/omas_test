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
