from pathlib import Path

# путь к папке проекта
BASE_DIR = Path(__file__).resolve().parent.parent


# ключи безопасности
SECRET_KEY = 'django-insecure-i*dz2*i4)e5i+h$ew_n#)%bku6tc8m4520jakn5b$(-m9=k2_j'

# дебаг режим
DEBUG = True

# список разрешенных хостов
ALLOWED_HOSTS = []


# подключение приложений
INSTALLED_APPS = [
    'django.contrib.admin', # админ панель Django
    'django.contrib.auth', # базовый модуль аутентификации и управления пользователями
    'django.contrib.contenttypes', # связь моделей с контентом (например, связь пользователя с его постами)
    'django.contrib.sessions', # сессии Django (хранение данных о сессии пользователя)
    'django.contrib.messages', # сообщения пользователю (например, об успешной регистрации)
    'django.contrib.staticfiles', # обработка статических файлов (CSS, JS, изображения)
]

# подключение мидлваров для обработки запросов до отправки их во view
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware', # защита от некоторых видов атак
    'django.contrib.sessions.middleware.SessionMiddleware', # обработка сессий
    'django.middleware.common.CommonMiddleware', # обработка общих вещей (например, добавление слеша в конце url)
    'django.middleware.csrf.CsrfViewMiddleware', # защита от CSRF-атак
    'django.contrib.auth.middleware.AuthenticationMiddleware', # обработка аутентификации
    'django.contrib.messages.middleware.MessageMiddleware', # обработка сообщений пользователю (например, об успешной регистрации)
    'django.middleware.clickjacking.XFrameOptionsMiddleware', # защита от кликджекинга
]

ROOT_URLCONF = 'backend.urls' # путь к файлу с url-ми

# шаблоны
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates', # используемый бэкенд для шаблонов (DjangoTemplates)
        'DIRS': [], # список папок, в которых будут искаться шаблоны
        'APP_DIRS': True, # указывает, что шаблоны будут искаться в папках приложений
        'OPTIONS': { # дополнительные настройки
            'context_processors': [ # список процессоров контекста, которые будут применены к каждому шаблону
                'django.template.context_processors.debug', # добавляет переменную debug и sql_queries в контекст шаблона (например, для отладки)
                'django.template.context_processors.request', # добавляет переменную request в контекст шаблона (доступ к данным запроса в шаблоне через request)
                'django.contrib.auth.context_processors.auth', # добавляет переменные user и perms в контекст шаблона (например, для проверки аутентификации)
                'django.contrib.messages.context_processors.messages', # добавляет переменную messages в контекст шаблона (например, уведомления об успешной регистрации)
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application' # путь к файлу WSGI-приложения

# база данных
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # используемый движок базы данных
        'NAME': BASE_DIR / 'db.sqlite3', # путь к файлу базы данных
    }
}



# валидаторы паролей
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', # проверка на схожесть пароля с атрибутами пользователя
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', # проверка на минимальную длину пароля
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', # проверка на использование общих паролей
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', # проверка на использование цифр в пароле
    },
]


LANGUAGE_CODE = 'ru' # язык по умолчанию

TIME_ZONE = 'UTC' # временная зона по умолчанию

USE_I18N = True # использование интернационализации

USE_TZ = True # использование временных зон

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField' # тип поля по умолчанию для автоинкремента
