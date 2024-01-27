from rest_framework import serializers
from .models import UserDetails
from django.contrib.auth.models import User
from .constants import GENDER_TYPE


class RegistrationSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(write_only=True, input_formats=['%Y-%m-%d'], required=False)
    gender = serializers.ChoiceField(choices=GENDER_TYPE)
    profile_pic = serializers.ImageField(required=False)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password',
                  'confirm_password', 'birth_date', 'gender', 'profile_pic']

    def save(self):
        username = self.validated_data['username']
        first_name = self.validated_data['first_name']
        last_name = self.validated_data['last_name']
        email = self.validated_data['email']
        password = self.validated_data['password']
        password2 = self.validated_data['confirm_password']
        # profile_pic = self.validated_data['profile_pic']
        birth_date = self.validated_data['birth_date']
        gender = self.validated_data['gender']
        profile_pic = self.validated_data.get('profile_pic', None)

        if password != password2:
            raise serializers.ValidationError(
                {'error': "Passwords doesn't matched"})

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'error': "Email already exists"})

        user = User(email=email, username=username,
                       first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.is_active = False
        user.save()

        UserDetails.objects.create(user=user, profile_pic=profile_pic, birth_date=birth_date, gender=gender)
        return user


class UserLoginSerializer(serializers.Serializer):
    # email = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
