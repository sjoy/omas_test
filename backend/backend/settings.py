from pathlib import Path

from environs import Env

env = Env()
env.read_env()

# путь к папке проекта
BASE_DIR = Path(__file__).resolve().parent.parent

# секретный ключ проекта
SECRET_KEY = env.str("SECRET_KEY")

# режим отладки
DEBUG = env.bool("DEBUG", default=False)

# список хостов, которые могут обращаться к бэкенду
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])


# подключение приложений
INSTALLED_APPS = [
    # админ панель Django
    "django.contrib.admin",
    # базовый модуль аутентификации и управления пользователями
    "django.contrib.auth",
    # базовый модуль для создания универсальных связей между моделями
    "django.contrib.contenttypes",
    # сессии Django (хранение данных о сессии пользователя)
    "django.contrib.sessions",
    # модуль для отправки сообщений пользователю (например, об успешной регистрации)
    "django.contrib.messages",
    # обработка статических файлов (например, CSS, JS, изображении)
    "django.contrib.staticfiles",
    # в письме для подтверждения email будет ссылка на сайт, поэтому нужно подключить sites(нужен для allauth)
    "django.contrib.sites",
    # для работы с api (сериализация, десериализация, токен)
    "rest_framework",
    # Для создания токенов для аутентификации
    "rest_framework.authtoken",
    # базовая функциональность для работы allauth.account
    "allauth",
    # для регистрации и подтверждения email
    "allauth.account",
    # для регистрации через соцсети(не добавил провайдеров, используется в dj_rest_auth.registration)
    "allauth.socialaccount",
    # api для входа и выхода пользователя, сброса пароля и смены пароля
    "dj_rest_auth",
    # api для регистрации пользователя (обертка allauth)
    "dj_rest_auth.registration",
    # чтобы можно было делать запросы с других доменов, портов (например, с фронтенда на другом порту)
    "corsheaders",
    # основное приложение
    "api",
    # swagger
    "drf_yasg",
]

# подключение мидлваров для обработки запросов до отправки их во view
MIDDLEWARE = [
    # защита от некоторых видов атак
    "django.middleware.security.SecurityMiddleware",
    # обработка сессий
    "django.contrib.sessions.middleware.SessionMiddleware",
    # обработка общих вещей (например, добавление слеша в конце url)
    "django.middleware.common.CommonMiddleware",
    # защита от CSRF-атак
    "django.middleware.csrf.CsrfViewMiddleware",
    # обработка аутентификации
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    # обработка сообщений пользователю (например, об успешной регистрации)
    "django.contrib.messages.middleware.MessageMiddleware",
    # защита от кликджекинга
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    # для работы с cors (разрешение запросов с других доменов, портов)
    "corsheaders.middleware.CorsMiddleware",
]

# для отправки писем на почту
# бэкенд для отправки писем
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# хост почты
EMAIL_HOST = env.str("EMAIL_HOST", default="smtp.mail.ru")
# если используется ssl, то порт 465 (если tls, то 587)
EMAIL_PORT = env.int("EMAIL_PORT", default=465)
# нельзя использовать и tls и ssl одновременно
# использовать tls
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=False)
# использовать ssl
EMAIL_USE_SSL = env.bool("EMAIL_USE_SSL", default=True)
# почта для отправки писем
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER")
# пароль от почты
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD")
# почта по умолчанию
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# бэкенды для аутентификации
AUTHENTICATION_BACKENDS = (
    # базовый бэкенд для аутентификации (поиск пользователя в бд)
    "django.contrib.auth.backends.ModelBackend",
    # для регистрации и подтверждения email (allauth)
    "allauth.account.auth_backends.AuthenticationBackend",
)

# id сайта (нужен для allauth для имени сайта в письме)
SITE_ID = 1
# требовать почту при регистрации
ACCOUNT_EMAIL_REQUIRED = True
# требовать подтверждение почты
ACCOUNT_EMAIL_VERIFICATION = "mandatory"

# отключение подтверждения почты
# если ACCOUNT_EMAIL_VERIFICATION = 'mandatory', то нужно закомментировать эту строку
# ACCOUNT_EMAIL_VERIFICATION = 'none'

# требовать имя пользователя при регистрации
ACCOUNT_USERNAME_REQUIRED = True
# Запоминать сессию пользователя (оставаться в системе после закрытия браузера)
ACCOUNT_SESSION_REMEMBER = True
# метод аутентификации (по имени пользователя)
ACCOUNT_AUTHENTICATION_METHOD = "username"
# уникальность почты
ACCOUNT_UNIQUE_EMAIL = True


# определяет способ аутентификации пользователя
REST_FRAMEWORK = {
    # все представления будут требовать аутентификации (кроме тех, где указан permission_classes = [AllowAny])
    "DEFAULT_AUTHENTICATION_CLASSES": [
        # использовать токены для аутентификации
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# путь к файлу с url-ми
ROOT_URLCONF = "backend.urls"

# шаблоны
TEMPLATES = [
    {
        # используемый бэкенд для шаблонов (DjangoTemplates)
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        # список папок, в которых будут искаться шаблоны
        "DIRS": [BASE_DIR / "templates"],
        # указывает, что шаблоны будут искаться в папках приложений
        "APP_DIRS": True,
        # дополнительные настройки
        "OPTIONS": {
            # список процессоров контекста, которые будут применены к каждому шаблону
            "context_processors": [
                # добавляет переменную debug и sql_queries в контекст шаблона (например, для отладки)
                "django.template.context_processors.debug",
                # добавляет переменную request в контекст шаблона (доступ к данным запроса в шаблоне через request)
                "django.template.context_processors.request",
                # добавляет переменные user и perms в контекст шаблона (например, для проверки аутентификации)
                "django.contrib.auth.context_processors.auth",
                # добавляет переменные messages и DEFAULT_MESSAGE_LEVELS в контекст шаблона (например, для вывода сообщений)
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# путь к файлу WSGI-приложения
WSGI_APPLICATION = "backend.wsgi.application"

# база данных
DATABASES = {
    "default": {
        # используемый движок базы данных
        "ENGINE": "django.db.backends.sqlite3",
        # путь к файлу базы данных
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# валидаторы паролей
AUTH_PASSWORD_VALIDATORS = [
    {
        # проверка на схожесть пароля с атрибутами пользователя
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        # проверка на минимальную длину пароля
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        # проверка на использование общих паролей
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        # проверка на использование цифр в пароле
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# язык по умолчанию
LANGUAGE_CODE = "ru"

# временная зона по умолчанию
TIME_ZONE = "Asia/Aqtobe"

# использование интернационализации
USE_I18N = True

# использование временных зон
USE_TZ = True

# URL для статических файлов
STATIC_URL = "static/"

# тип поля по умолчанию для автоинкремента
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# настройки для cors, список хостов, которые могут обращаться к бэкенду
CORS_ALLOWED_ORIGINS = env.list(
    "CORS_ALLOWED_ORIGINS", default=["http://localhost:5173"]
)

CSRF_TRUSTED_ORIGINS = env.list(
    "CSRF_TRUSTED_ORIGINS", default=["http://localhost:5174"]
)
