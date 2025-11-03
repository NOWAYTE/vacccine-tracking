from rest_framework import routers
from .views import PatientViewSet, VaccineViewSet

router = routers.DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'vaccines', VaccineViewSet)

urlpatterns = router.urls

