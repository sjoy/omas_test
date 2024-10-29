from django.db import models
from django.contrib.auth.models import User

# Справочная таблица для типов животных (например, корова, лощадь)
class RefAnimalType(models.Model):
    name_kk = models.CharField(max_length=255) # название на казахском
    name_ru = models.CharField(max_length=255) # название на русском
    name_en = models.CharField(max_length=255) # название на английском

    # возвращает название на русском
    def __str__(self):
        return self.name_ru

# Справочная таблица для пород животных
class RefBreed(models.Model):
    animal_type = models.ForeignKey(RefAnimalType, on_delete=models.CASCADE) # тип животного
    name_kk = models.CharField(max_length=255) # название на казахском
    name_ru = models.CharField(max_length=255) # название на русском
    name_en = models.CharField(max_length=255) # название на английском

    # возвращает название на русском
    def __str__(self):
        return self.name_ru 

# Рабочая таблица для животных
class Animal(models.Model):
    # для выбора пола животного
    GENDER_CHOICES = [
        ('M', 'Мужской'),
        ('F', 'Женский'),
    ] 

    inventory_number = models.CharField(max_length=255, unique=True) # инвентарный номер
    nickname_kk = models.CharField(max_length=255) # кличка на казахском
    nickname_ru = models.CharField(max_length=255) # кличка на русском
    nickname_en = models.CharField(max_length=255) # кличка на английском
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES) # пол
    arrival_date = models.DateField() # дата прибытия
    arrival_age = models.IntegerField(help_text='Возраст при прибытии в месяцах') # возраст при прибытии в месяцах
    breed = models.ForeignKey(RefBreed, on_delete=models.CASCADE) # порода
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL) # родитель
    created = models.DateTimeField(auto_now_add=True) # дата создания записи
    updated = models.DateTimeField(auto_now=True) # дата обновления записи

    # возвращает кличку на русском
    def __str__(self):
        return self.nickname_ru 

# Рабочая таблица для взвешивания животных
class Weighting(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE) # животное
    weight_date = models.DateField() # дата взвешивания
    weight = models.FloatField() # вес
    user = models.ForeignKey(User, on_delete=models.CASCADE) # пользователь
    created = models.DateTimeField(auto_now_add=True) # дата создания записи
    updated = models.DateTimeField(auto_now=True) # дата обновления записи

    # уникальность по животному и дате взвешивания
    class Meta:
        unique_together = ('animal', 'weight_date')

    # возвращает кличку животного, вес и дату взвешивания
    def __str__(self):
        return f"{self.animal.nickname_ru} - {self.weight} кг, дата {self.weight_date}"