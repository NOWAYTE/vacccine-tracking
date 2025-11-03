from rest_framework import viewsets, decorators, response
from django.utils import timezone
from core.permissions import IsAdminOrStaff, IsAdminStaffOrOwner
from .models import Vaccine, Patient, DoseRecord, Reminder, Certificate
from .serializers import VaccineSerializer, PatientSerializer, DoseRecordSerializer, ReminderSerializer, CertificateSerializer
# from core.emails import send_reminder_email

class VaccineViewSet(viewsets.ModelViewSet):
    queryset = Vaccine.objects.all().order_by("name")
    serializer_class = VaccineSerializer
    permission_classes = [IsAdminOrStaff]

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.select_related("vaccine").all().order_by("-id")
    serializer_class = PatientSerializer
    permission_classes = [IsAdminStaffOrOwner]

    @decorators.action(detail=True, methods=["post"], permission_classes=[IsAdminOrStaff])
    def attend(self, request, pk=None):
        patient = self.get_object()
        patient.attended = bool(request.data.get("attended", True))
        patient.save(update_fields=["attended"])
        return response.Response({"id": patient.id, "attended": patient.attended})

class DoseRecordViewSet(viewsets.ModelViewSet):
    queryset = DoseRecord.objects.all()
    serializer_class = DoseRecordSerializer
    permission_classes = [IsAdminOrStaff]

class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
    permission_classes = [IsAdminOrStaff]

    @decorators.action(detail=True, methods=["post"], permission_classes=[IsAdminOrStaff])
    def send(self, request, pk=None):
        rem = self.get_object()
        # send_reminder_email(rem.patient, rem.patient.vaccine.name, rem.patient.doseDates, rem.patient.center)
        rem.sent_at = timezone.now()
        rem.status = "sent"
        rem.save(update_fields=["sent_at","status"])
        return response.Response({"id": rem.id, "status": rem.status})

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [IsAdminOrStaff]