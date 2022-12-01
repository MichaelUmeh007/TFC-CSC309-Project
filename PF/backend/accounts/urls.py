from django.urls import path
from accounts.views import RegisterView, ProfileView, ClassesProfileView, ProfilePaymentView, PaymentHistoryView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register-user"), # user registration
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),    # login/token generation
                                                                                    # logout funcitonality not needed at this stage
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   # token-refresh
    path('profile/', ProfileView.as_view(), name="profile-user"),
    path('profile/classes/', ClassesProfileView.as_view(), name="user-classes"),
    path('profile/payment-history/', PaymentHistoryView.as_view(), name='payments'),
    path('profile/', ProfileView.as_view(), name="profile-user"),                   # profile view, profile edit
    path('profile/classes/', ClassesProfileView.as_view(), name="user-classes"),    # view user classes in chrono order
    path('profile/payment/', ProfilePaymentView.as_view(), name="payment-info")
 ]
