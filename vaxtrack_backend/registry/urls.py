from rest_framework.routers import DefaultRouter
from .views import VaccineViewSet, PatientViewSet, DoseRecordViewSet, ReminderViewSet, CertificateViewSet

router = DefaultRouter()
router.register(r"vaccines", VaccineViewSet, basename="vaccine")
router.register(r"patients", PatientViewSet, basename="patient")
router.register(r"doses", DoseRecordViewSet, basename="dose")
router.register(r"reminders", ReminderViewSet, basename="reminder")
router.register(r"certificates", CertificateViewSet, basename="certificate")

urlpatterns = router.urls