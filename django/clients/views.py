from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Client
from .serializers import ClientSerializer
import cv2
import numpy as np
import tempfile
from tensorflow.keras.models import load_model
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile

@api_view(['POST'])
def predict_signature(request):
    email = request.POST.get('email')  # ou request.data.get selon ton frontend

    if not email:
        return Response({'error': 'Email manquant.'}, status=status.HTTP_400_BAD_REQUEST)

    if 'image' not in request.FILES:
        return Response({'error': 'Aucune image fournie.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        client = Client.objects.get(email=email)
    except Client.DoesNotExist:
        return Response({'error': 'Client non trouvé avec cet email.'}, status=status.HTTP_404_NOT_FOUND)

    if not client.image_signature:
        return Response({'error': 'Ce client ne possède pas de signature enregistrée.'}, status=status.HTTP_404_NOT_FOUND)

    # === Image envoyée ===
    image_file = request.FILES['image']
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_image:
        for chunk in image_file.chunks():
            temp_image.write(chunk)
        input_image_path = temp_image.name

    # === Image de référence (client) ===
    reference_image_path = client.image_signature.path  # ou un chemin absolu selon ton modèle

    # === Prétraitement des deux images ===
    def preprocess_image(path):
        img = cv2.imread(path)
        if img is None:
            return None
        img = cv2.resize(img, (150, 150))
        img = img.astype('float32') / 255.0
        return np.expand_dims(img, axis=0)

    input_img = preprocess_image(input_image_path)
    reference_img = preprocess_image(reference_image_path)

    if input_img is None or reference_img is None:
        return Response({'error': 'Erreur de chargement des images.'}, status=status.HTTP_400_BAD_REQUEST)

    # === Charger le modèle ===
    model = load_model(settings.BASE_DIR / 'best_model.keras')

    # === Comparaison avec le modèle ===
    prediction = model.predict([input_img, reference_img])  # attention : adapter si ton modèle prend 2 inputs
    predicted_class = np.argmax(prediction)
    confidence = float(prediction[0][predicted_class])

    classes = ['Genuine', 'Forged']
    result = {
        'client': client.email,
        'prediction': classes[predicted_class],
        'confidence': f"{confidence:.2%}"
    }

    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def client_list(request):
    clients = Client.objects.all()
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def client_create(request):
    serializer = ClientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def client_update(request, pk):
    try:
        client = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = ClientSerializer(client, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def client_delete(request, pk):
    try:
        client = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    client.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)