from rest_framework import serializers
from .models import User  # Ton modèle utilisateur

class UserSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        # Créer un utilisateur avec les données validées
        user = User.objects.create(
            name=validated_data['name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # pour hasher le mot de passe
        user.save()
        return user
 