from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from . import serializers
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


from django.shortcuts import redirect

# for generating token
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

# for sending email
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib import messages


class UserRegistration(APIView):
    serializer_class = serializers.RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            confirm_link = f'http://127.0.0.1:8000/accounts/activate/{uid}/{token}/'

            email_subject = 'Confirm your email'
            email_body = render_to_string(
                'accounts/email_templates/email_confirmation.html', {'confirm_link': confirm_link})
            email = EmailMultiAlternatives(
                email_subject, '', to=[user.email]
            )
            email.attach_alternative(email_body, 'text/html')
            email.send()

            return Response('Check your email for activation link')
        return Response(serializer.errors)


def activate(request, uid64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uid64))
        user = User._default_manager.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(
            request, "Your account has been activated. You can now log in.")
        # return redirect('login')
        # Redirect to the frontend login page
        return redirect('http://localhost:5173/login')
    else:
        messages.error(request, "Invalid activation link.")
        return redirect('register')



class UserLoginApiView(APIView):
    def post(self, request):
        serializer = serializers.UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        print(f"Email: {email}, Password: {password}")

        user = User.objects.filter(email=email).first()
        print(f"User: {user}")

        if user and user.check_password(password):
            token, _ = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({'token': token.key, 'email': user.email, 'user_id': user.id}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    def get(self, request, *args, **kwargs):
        if request.auth:  # Check if authentication token exists
            request.auth.delete()  # Delete the authentication token
        logout(request)
        return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)

