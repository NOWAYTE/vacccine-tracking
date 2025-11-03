from django.contrib import admin
from .models import Vaccine, Patient, DoseRecord, Reminder, Certificate

@admin.register(Vaccine)
class VaccineAdmin(admin.ModelAdmin):
    list_display = ("id","name","manufacturer","doses","expiry_date")
    search_fields = ("name","manufacturer")

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ("id","name","Gender","age","bloodGroup","email","vaccine","attended")
    search_fields = ("name","email")
    list_filter = ("Gender","bloodGroup","attended","vaccine")

@admin.register(DoseRecord)
class DoseRecordAdmin(admin.ModelAdmin):
    list_display = ("id","patient","dose_number","date_administered","center")

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ("id","patient","due_date","sent_at","channel","status")

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("id","patient","issued_at","pdf_file")