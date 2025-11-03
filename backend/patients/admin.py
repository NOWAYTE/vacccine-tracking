from django.contrib import admin
from .models import Patient, Vaccine

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'dob', 'email', 'phone')

@admin.register(Vaccine)
class VaccineAdmin(admin.ModelAdmin):
    list_display = ('vaccine_name', 'patient', 'dose_number', 'date_administered')

