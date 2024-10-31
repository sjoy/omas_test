# Generated by Django 5.1.2 on 2024-10-31 12:47

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RefAnimalType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_name', models.CharField(default='Unknown', max_length=255, unique=True, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'Тип животного',
                'verbose_name_plural': 'Типы животных',
            },
        ),
        migrations.CreateModel(
            name='RefBreed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('breed_name', models.CharField(default='Unknown', max_length=255, verbose_name='Название')),
                ('animal_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.refanimaltype')),
            ],
            options={
                'verbose_name': 'Порода',
                'verbose_name_plural': 'Породы',
                'unique_together': {('animal_type', 'breed_name')},
            },
        ),
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inventory_number', models.CharField(max_length=255, unique=True, verbose_name='Инвентарный номер')),
                ('nickname', models.CharField(max_length=255, verbose_name='Кличка')),
                ('gender', models.CharField(choices=[('M', 'Самец'), ('F', 'Самка')], max_length=1, verbose_name='Пол')),
                ('arrival_date', models.DateField(verbose_name='Дата прибытия')),
                ('arrival_age', models.IntegerField(verbose_name='Возраст при прибытии')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания записи')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Дата обновления записи')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.animal', verbose_name='Родитель')),
                ('breed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.refbreed', verbose_name='Порода')),
            ],
            options={
                'verbose_name': 'Животное',
                'verbose_name_plural': 'Животные',
            },
        ),
        migrations.CreateModel(
            name='Weighting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight_date', models.DateField(verbose_name='Дата взвешивания')),
                ('weight', models.FloatField(validators=[django.core.validators.MinValueValidator(0.0)], verbose_name='Вес')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания записи')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Дата обновления записи')),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.animal', verbose_name='Животное')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Взвешивание',
                'verbose_name_plural': 'Взвешивания',
                'unique_together': {('animal', 'weight_date')},
            },
        ),
    ]
