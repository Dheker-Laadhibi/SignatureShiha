from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=100)
    password = models.CharField(max_length=100)
    
    username = None  # Supprimer le champ username par défaut

    USERNAME_FIELD = 'email'  # Utiliser l’email comme identifiant principal
    REQUIRED_FIELDS = []  # Aucune autre info requise à part l’email
