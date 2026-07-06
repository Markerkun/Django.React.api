from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'image_small',
            'image_medium',
            'image_large'
        ]


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'password',
        ]
    

class RegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    image = serializers.ImageField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [ 'username', 'first_name', 'last_name', 'email', 'password', 'confirm_password', 'image' ]

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Паролі не збігаються."})
        return attrs
    


