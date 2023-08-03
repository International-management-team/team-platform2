from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import TimeTable
from django.contrib.auth.hashers import make_password


User = get_user_model()


class TimeTableSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели TimeTable.
    Отображает информацию о графике работы в JSON-представлении.
    """
    class Meta:
        model = TimeTable
        fields = '__all__'


class CustomUserCreateSerializer(serializers.ModelSerializer):
    """
    Сериализатор для создания пользователя.
    Отображает информацию о пользователе в JSON-представлении при создании.

    Здесь определены поля, которые будут отображаться при создании пользователя.
    """
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        """
        Хэшируем пароль перед сохранением в базу данных.
        """
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели User.
    Отображает информацию о пользователе в JSON-представлении,
    включая информацию о связанных графиках работы с помощью TimeTableSerializer.

    Включаем вложенный сериализатор TimeTableSerializer, чтобы
    отобразить информацию о связанных графиках работы для каждого пользователя.
    """
    timetable = TimeTableSerializer(many=True, read_only=True)

    class Meta:
        """
        Здесь определены поля, которые будут отображаться в JSON-представлении пользователя.
        """
        model = User

        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'created_at', 'update_at', 'is_active', 'user_timezone',
            'timetable', 'photo', 'telephone_number'
        ]