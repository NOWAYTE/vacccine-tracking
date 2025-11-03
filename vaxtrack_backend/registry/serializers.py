from rest_framework import serializers
from .models import Vaccine, Patient, DoseRecord, Reminder, Certificate

class VaccineSerializer(serializers.ModelSerializer):
    expiryDate = serializers.DateField(source="expiry_date", required=False, allow_null=True)
    class Meta:
        model = Vaccine
        fields = ["id","name","manufacturer","doses","centers","expiryDate"]

class PatientSerializer(serializers.ModelSerializer):
    vaccine = serializers.SlugRelatedField(slug_field="name", queryset=Vaccine.objects.all())
    doseDates = serializers.ListField(child=serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"]), required=False)
    class Meta:
        model = Patient
        fields = ["id","name","Gender","age","medicalHistory","bloodGroup","email","vaccine","center","doseDates","attended","initial_password"]
        read_only_fields = ["id"]

class DoseRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoseRecord
        fields = ["id","patient","dose_number","date_administered","center","manufacturer"]

class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ["id","patient","due_date","sent_at","channel","status","meta"]

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ["id","patient","issued_at","pdf_file"]
        read_only_fields = ["id","issued_at","pdf_file"]