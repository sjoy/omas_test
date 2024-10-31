from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models


# Справочная таблица для типов животных (например, корова, лощадь)
class RefAnimalType(models.Model):
    type_name = models.CharField(
        max_length=255,
        verbose_name="Название",
        default="Unknown",
        unique=True,
    )

    class Meta:
        verbose_name = "Тип животного"
        verbose_name_plural = "Типы животных"

    def __str__(self):
        return self.type_name


# Справочная таблица для пород животных
class RefBreed(models.Model):
    animal_type = models.ForeignKey(
        RefAnimalType, on_delete=models.CASCADE
    )  # тип животного
    breed_name = models.CharField(
        max_length=255,
        verbose_name="Название",
        default="Unknown",
    )

    class Meta:
        verbose_name = "Порода"
        verbose_name_plural = "Породы"
        unique_together = ("animal_type", "breed_name")

    def __str__(self):
        return self.breed_name


# Рабочая таблица для животных
class Animal(models.Model):

    # для выбора пола животного
    GENDER_CHOICES = [
        ("M", "Самец"),
        ("F", "Самка"),
    ]

    inventory_number = models.CharField(
        max_length=255, unique=True, verbose_name="Инвентарный номер"
    )
    nickname = models.CharField(
        max_length=255,
        verbose_name="Кличка",
        default="Unknown",
    )
    gender = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES,
        verbose_name="Пол",
    )
    arrival_date = models.DateField(verbose_name="Дата прибытия")
    arrival_age = models.IntegerField(verbose_name="Возраст при прибытии")
    breed = models.ForeignKey(
        RefBreed,
        on_delete=models.CASCADE,
        verbose_name="Порода",
    )
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="Родитель",
    )
    created = models.DateTimeField(
        auto_now_add=True, verbose_name="Дата создания записи"
    )
    updated = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления записи",
    )

    class Meta:
        verbose_name = "Животное"
        verbose_name_plural = "Животные"

    def __str__(self):
        return self.nickname

    def clean(self):
        if self.parent:
            if self.parent == self:
                raise ValidationError(
                    "Животное не может быть своим собственным родителем.",
                )
            # Проверяем, что родительское животное имеет ту же породу
            if self.parent.breed != self.breed:
                raise ValidationError(
                    "Родительское животное должно быть той же породы.",
                )


# Рабочая таблица для взвешивания животных
class Weighting(models.Model):
    animal = models.ForeignKey(
        Animal, on_delete=models.CASCADE, verbose_name="Животное"
    )
    weight_date = models.DateField(verbose_name="Дата взвешивания")
    weight = models.FloatField(
        verbose_name="Вес",
        validators=[MinValueValidator(0.0)],
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    created = models.DateTimeField(
        auto_now_add=True, verbose_name="Дата создания записи"
    )
    updated = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления записи",
    )

    class Meta:
        # Животное может быть взвешено только один раз в день
        unique_together = ("animal", "weight_date")
        verbose_name = "Взвешивание"
        verbose_name_plural = "Взвешивания"

    def __str__(self):
        # В админке выводим название животного, вес и дату взвешивания
        return f"{self.animal.nickname} - {self.weight} кг, дата {self.weight_date}"
