from django.db import models
from django.conf import settings

class Vaccine(models.Model):
    name = models.CharField(max_length=128, unique=True)
    manufacturer = models.CharField(max_length=128, blank=True)
    doses = models.PositiveSmallIntegerField(default=1)
    centers = models.JSONField(default=list, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    def __str__(self): return self.name

class Patient(models.Model):
    name = models.CharField(max_length=128)
    Gender = models.CharField(max_length=16)
    age = models.PositiveSmallIntegerField()
    medicalHistory = models.TextField()
    bloodGroup = models.CharField(max_length=4)
    email = models.EmailField()
    center = models.CharField(max_length=128, blank=True)
    vaccine = models.ForeignKey(Vaccine, on_delete=models.PROTECT, related_name="patients")
    doseDates = models.JSONField(default=list, blank=True)
    attended = models.BooleanField(default=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    initial_password = models.CharField(max_length=64, blank=True)
    def __str__(self): return self.name

class DoseRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="dose_records")
    dose_number = models.PositiveSmallIntegerField()
    date_administered = models.DateField()
    center = models.CharField(max_length=128, blank=True)
    manufacturer = models.CharField(max_length=128, blank=True)
    class Meta:
        unique_together = ("patient","dose_number")

class Reminder(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="reminders")
    due_date = models.DateField()
    sent_at = models.DateTimeField(null=True, blank=True)
    channel = models.CharField(max_length=16, default="email")
    status = models.CharField(max_length=16, default="pending")
    meta = models.JSONField(default=dict, blank=True)

class Certificate(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name="certificate")
    issued_at = models.DateTimeField(auto_now_add=True)
    pdf_file = models.FileField(upload_to="certificates/")