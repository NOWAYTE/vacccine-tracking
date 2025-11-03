from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminOrStaff
from registry.models import Patient, Vaccine, DoseRecord

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminOrStaff])
def dashboard_stats(request):
    return Response({
        "patients": Patient.objects.count(),
        "vaccines": Vaccine.objects.count(),
        "doses_administered": DoseRecord.objects.count(),
    })