from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ("ADMIN", "Admin"),
        ("STAFF", "Healthcare Staff"),
        ("PATIENT", "Patient"),
    ]
    role = models.CharField(max_length=16, choices=ROLE_CHOICES, default="PATIENT")