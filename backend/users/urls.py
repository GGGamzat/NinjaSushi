from django.urls import path
from .views import send_verification_code, verify_code, logout_view, profile_view
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('send-code/', send_verification_code, name='send_code'),
    path('verify-code/', verify_code, name='verify_code'),
    path('logout/', logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
]
