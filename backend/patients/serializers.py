from rest_framework import serializers
from .models import Patient, Vaccine

class VaccineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaccine
        fields = ['id', 'patient', 'vaccine_name', 'dose_number', 'date_administered', 'note', 'created_at']

class PatientSerializer(serializers.ModelSerializer):
    vaccines = VaccineSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'dob', 'gender', 'phone', 'email', 'created_at', 'vaccines']

