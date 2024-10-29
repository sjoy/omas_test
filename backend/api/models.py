from django.db import models
from django.contrib.auth.models import User

# Справочная таблица для типов животных (например, корова, лощадь)
class RefAnimalType(models.Model):
    name_kk = models.CharField(max_length=255, verbose_name='Название на казахском')
    name_ru = models.CharField(max_length=255, verbose_name='Название на русском')
    name_en = models.CharField(max_length=255, verbose_name='Название на английском')

    class Meta:
        verbose_name = 'Тип животного'
        verbose_name_plural = 'Типы животных'

    def __str__(self):
        return self.name_ru

# Справочная таблица для пород животных
class RefBreed(models.Model):
    animal_type = models.ForeignKey(RefAnimalType, on_delete=models.CASCADE) # тип животного
    name_kk = models.CharField(max_length=255, verbose_name='Название на казахском')
    name_ru = models.CharField(max_length=255, verbose_name='Название на русском')
    name_en = models.CharField(max_length=255, verbose_name='Название на английском')

    class Meta:
        verbose_name = 'Порода'
        verbose_name_plural = 'Породы'

    def __str__(self):
        return self.name_ru 

# Рабочая таблица для животных
class Animal(models.Model):

    # для выбора пола животного
    GENDER_CHOICES = [
        ('M', 'Самец'),
        ('F', 'Самка'),
    ] 

    inventory_number = models.CharField(max_length=255, unique=True, verbose_name='Инвентарный номер')
    nickname_kk = models.CharField(max_length=255, verbose_name='Кличка на казахском')
    nickname_ru = models.CharField(max_length=255, verbose_name='Кличка на русском')
    nickname_en = models.CharField(max_length=255, verbose_name='Кличка на английском')
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name='Пол')
    arrival_date = models.DateField(verbose_name='Дата прибытия')
    arrival_age = models.IntegerField(verbose_name='Возраст при прибытии')
    breed = models.ForeignKey(RefBreed, on_delete=models.CASCADE, verbose_name='Порода')
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, verbose_name='Родитель')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания записи')
    updated = models.DateTimeField(auto_now=True, verbose_name='Дата обновления записи')

    class Meta:
        verbose_name = 'Животное'
        verbose_name_plural = 'Животные'

    def __str__(self):
        return self.nickname_ru 

# Рабочая таблица для взвешивания животных
class Weighting(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, verbose_name='Животное')
    weight_date = models.DateField(verbose_name='Дата взвешивания')
    weight = models.FloatField(verbose_name='Вес')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания записи')
    updated = models.DateTimeField(auto_now=True, verbose_name='Дата обновления записи')

    # уникальность по животному и дате взвешивания
    class Meta:
        unique_together = ('animal', 'weight_date')
        verbose_name = 'Взвешивание'
        verbose_name_plural = 'Взвешивания'

    def __str__(self):
        return f"{self.animal.nickname_ru} - {self.weight} кг, дата {self.weight_date}"