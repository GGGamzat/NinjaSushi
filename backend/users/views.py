from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from twilio.rest import Client
from .models import User

if all([settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN, settings.TWILIO_PHONE_NUMBER]):
    twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
else:
    twilio_client = None
    print("Twilio client is not configured. SMS sending will be simulated.")


@api_view(['POST'])
@permission_classes([])
def send_verification_code(request):
    serializer = PhoneNumberSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    phone_number = serializer.validated_data['phone_number']
    
    verification_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    
    try:
        if settings.DEBUG or not twilio_client:
            print(f"🔐 Verification code for {phone_number}: {verification_code}")
        else:
            message = twilio_client.messages.create(
                body=f'Your verification code: {verification_code}',
                from_=settings.TWILIO_PHONE_NUMBER,
                to=phone_number
            )
            print(f"✅ SMS sent to {phone_number}, SID: {message.sid}")
        
        request.session['verification_code'] = verification_code
        request.session['phone_number'] = phone_number
        request.session.save()
        
        return Response({
            'message': 'Verification code sent successfully',
            'debug_code': verification_code if settings.DEBUG else None
        })
    
    except TwilioRestException as e:
        print(f"❌ Twilio error: {e}")
        return Response(
            {'error': 'Failed to send SMS. Please try again.'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return Response(
            {'error': 'An unexpected error occurred'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([])
def verify_code(request):
    serializer = VerificationCodeSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    code = serializer.validated_data['code']
    phone_number = request.session.get('phone_number')
    stored_code = request.session.get('verification_code')
    
    if not phone_number:
        return Response({'error': 'Phone number not found in session'}, status=status.HTTP_400_BAD_REQUEST)
    
    if code != stored_code:
        return Response({'error': 'Invalid verification code'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Создаем или получаем пользователя
    user, created = CustomUser.objects.get_or_create(phone_number=phone_number)
    
    if created:
        user.set_unusable_password()
        user.save()
    
    # Создаем токен для аутентификации
    token, _ = Token.objects.get_or_create(user=user)
    
    # Очищаем сессию
    request.session.flush()
    
    # Используем сериализатор для возврата данных пользователя
    user_data = UserSerializer(user).data
    
    return Response({
        'token': token.key,
        'user': user_data
    })


@api_view(['POST'])
def logout_view(request):
    if request.user.is_authenticated:
        try:
            Token.objects.filter(user=request.user).delete()
        except:
            pass
    return Response({'message': 'Logged out successfully'})


@api_view(['GET', 'PUT'])
def profile_view(request):
    if request.method == 'GET':
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated successfully',
                'user': serializer.data
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)