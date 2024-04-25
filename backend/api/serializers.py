from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Event

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        """
            Serialize a User model object
        """
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """
            Override the default create method to handle user creation user with hashed password
        """
        user = User.objects.create_user(**validated_data)
        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        """
            Serialize the Event model object
        """
        model = Event
        fields = ['id','title', 'description', 'start', 'end', 'createdBy']
        extra_kwargs = {'createdBy': {'read_only': True}}
    