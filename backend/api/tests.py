from django.contrib.auth.models import User
from django.urls import reverse
from environs import Env
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from .models import Animal, RefAnimalType, RefBreed, Weighting


class WeightingViewSetTestCase(APITestCase):
    def setUp(self):
        env = Env()
        env.read_env()
        # Create an admin user
        self.admin_user = User.objects.create_user(
            username=env.str("ADMIN_USER_NAME"),
            password=env.str("ADMIN_USER_PWD"),
            is_staff=True,
        )
        # Create a regular user
        self.user = User.objects.create_user(
            username=env.str("USER_NAME"), password=env.str("USER_PWD")
        )
        # Set up API client
        self.client = APIClient()
        # Create a breed object
        self.animal_type = RefAnimalType.objects.create(type_name="собака")
        # Create a breed object
        self.breed = RefBreed.objects.create(
            breed_name="овчарка", animal_type=self.animal_type
        )
        # Create an animal object
        self.animal = Animal.objects.create(
            inventory_number=1111,
            gender="F",
            arrival_date="2024-10-30",
            arrival_age=5,
            breed=self.breed,
            nickname="Шарик",
        )
        # Create a weighting object for the regular user
        self.weighting = Weighting.objects.create(
            weight_date="2024-10-25",
            weight=50,
            user=self.user,
            animal=self.animal,
        )
        self.weighting_url = reverse(
            "weighting-detail", kwargs={"pk": self.weighting.pk}
        )

    def test_admin_can_view_all_weightings(self):
        # Log in as admin
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(reverse("weighting-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Weighting.objects.count())

    def test_user_can_view_own_weightings(self):
        # Log in as regular user
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("weighting-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            len(response.data),
            Weighting.objects.filter(user=self.user).count(),
        )

    def test_user_cannot_view_others_weightings(self):
        # Log in as a different regular user
        another_user = User.objects.create_user(
            username="another_user", password="another123"
        )
        self.client.force_authenticate(user=another_user)
        response = self.client.get(self.weighting_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_weighting(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("weighting-list"),
            {
                "weight_date": "2024-10-26",
                "weight": 10,
                "animal": 1,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Weighting.objects.filter(user=self.user).count(), 2)

    def test_admin_can_update_any_weighting(self):
        # Log in as admin
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.put(
            self.weighting_url,
            {
                "weight_date": "2024-10-26",
                "weight": 80,
                "animal": 1,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.weighting.refresh_from_db()
        self.assertEqual(self.weighting.weight, 80)

    def test_user_can_update_own_weighting(self):
        # Log in as regular user
        self.client.force_authenticate(user=self.user)
        response = self.client.put(
            self.weighting_url,
            {
                "weight_date": "2024-10-26",
                "weight": 85,
                "animal": 1,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.weighting.refresh_from_db()
        self.assertEqual(self.weighting.weight, 85)

    def test_user_cannot_update_others_weighting(self):
        # Log in as a different user
        another_user = User.objects.create_user(
            username="another_user",
            password="another123",
        )
        self.client.force_authenticate(user=another_user)
        response = self.client.put(self.weighting_url, {"weight": 85})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_delete_any_weighting(self):
        # Log in as admin
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(self.weighting_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(
            Weighting.objects.filter(pk=self.weighting.pk).exists(),
        )

    def test_user_can_delete_own_weighting(self):
        # Log in as regular user
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(self.weighting_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(
            Weighting.objects.filter(pk=self.weighting.pk).exists(),
        )

    def test_user_cannot_delete_others_weighting(self):
        # Log in as a different user
        another_user = User.objects.create_user(
            username="another_user", password="another123"
        )
        self.client.force_authenticate(user=another_user)
        response = self.client.delete(self.weighting_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
