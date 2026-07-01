import random

from django.db.migrations import serializer
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CustomUser
from .serializers import LoginSerializer, UserSerializer


FIRST_NAMES = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"]
LAST_NAMES = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Lee"]
DOMAINS = ["example.com", "test.com", "mail.com"]


def generate_random_users(n=5):
    created_users = []

    for _ in range(n):
        while True:
            username = f"user{random.randint(1000, 9999)}"
            if not CustomUser.objects.filter(username=username).exists():
                break

        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        email = f"{first_name.lower()}.{last_name.lower()}@{random.choice(DOMAINS)}"

        user = CustomUser.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        created_users.append(user)

    return created_users


# Create your views here.
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def generate(self, request):
        users = generate_random_users(5)
        serializer = self.get_serializer(users, many=True)
        #Повертаю дані, які було згенеровано рандом
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='login', serializer_class=LoginSerializer)
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = CustomUser.objects.filter(username=username)
            user = user.first()
            if not user:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
