# Руководство по настройке проекта Django

Это руководство поможет настроить проект Django с виртуальным окружением, инициализацией базы данных и конфигурацией документации API.

## Предварительные требования

- Python 3.x
- pip (установщик пакетов Python)

## Инструкции по настройке

### 1. Создайте виртуальное окружение

Чтобы изолировать зависимости, создайте виртуальное окружение в папке `venv` (или дайте любое другое название):

```bash
python3 -m venv venv
```
### 2. Активируйте виртуальное окружение

- **Для Linux или macOS:**

  ```bash
  source venv/bin/activate
  ```

- **Для Windows:**
  ```bash
  venv\Scripts\activate
  ```

### 3. Установите зависимости
Когда виртуальное окружение активно, установите все необходимые пакеты из файла requirements.txt:
```bash
pip install -r requirements.txt
```

### 4. Проверьте установку Django
Проверьте, что Django установлен, проверив его версию:
```bash
django-admin --version
```

### 5. Настройте базу данных
Django по умолчанию использует SQLite, но можно настроить другие базы данных в файле settings.py. Чтобы инициализировать базу данных, выполните следующие команды:
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Запустите сервер разработки
Перейдите в директорию проекта и запустите сервер:

```bash
cd myproject
python manage.py runserver
```
Сервер запустится по адресу http://127.0.0.1:8000/.

### 7. Создайте суперпользователя для доступа к панели администратора
Для доступа к административной панели Django создайте учетную запись суперпользователя:

```bash
python manage.py createsuperuser
```

Следуйте подсказкам для задания имени пользователя, электронной почты и пароля для администратора.

## Документация API

Django REST Framework предоставляет документацию API по следующим адресам (если настроено):

- **Swagger UI**: [http://127.0.0.1:8000/swagger/](http://127.0.0.1:8000/swagger/)
- **ReDoc**: [http://127.0.0.1:8000/redoc/](http://127.0.0.1:8000/redoc/)

## Запуск тестов

Чтобы проверить работу API, выполните тесты:

```bash
python manage.py test api
```
Это выполнит все тесты, определенные в приложении api.

### Дополнительная информация
- **Панель администратора**: Доступна по адресу http://127.0.0.1:8000/admin/.
- **Swagger и ReDoc**: Эти интерфейсы позволяют удобно взаимодействовать с API и просматривать доступные эндпоинты.

# Настройка фронтенда с Vite и React

## Шаги по установке и запуску фронтенда

1. Перейдите в каталог frontend:
   ```bash
   cd frontend
   ```
2. Установите необходимые зависимости:
  ```bash
  npm install
  ```
3. Запустите сервер разработки Vite:
  ```bash
  npm run dev
  ```
Это должно запустить сервер разработки и предоставить вам URL, обычно http://localhost:5173, для просмотра приложения.

# Конфигурация бэкенда для защиты от CSRF
Чтобы избежать ошибок, связанных с CSRF, обновите CSRF_TRUSTED_ORIGINS в настройках бэкенда, включив URL-адрес фронтенда.
1. Откройте файл settings.py
2. Добавьте URL-адрес фронтенда в CSRF_TRUSTED_ORIGINS:
  ```pyhon
  CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  #  Обновите это, если ваш фронтенд работает на другом URL-адресе
  ]
  ```
