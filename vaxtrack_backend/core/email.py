from django.core.mail import send_mail

def send_reminder_email(patient, vaccine_name, dates, center):
    subject = f"Vaccine reminder: {vaccine_name}"
    msg = f"Hello {patient.name}, your scheduled doses: {', '.join(dates)} at {center}."
    send_mail(subject, msg, None, [patient.email], fail_silently=False)