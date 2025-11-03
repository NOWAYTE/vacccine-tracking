import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function PatientPage() {
  const router = useRouter();
  const { id } = router.query; // Patient password passed in the URL
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (id) {
      const patients = JSON.parse(sessionStorage.getItem('patients')) || [];
      const patientData = patients.find((p) => p.password === id);
      setPatient(patientData);
    }
  }, [id]);

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Patient Dashboard</h1>
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold">Welcome, {patient.patientName}</h2>
        <p>
          <strong>Vaccine:</strong> {patient.selectedVaccine}
        </p>
        <p>
          <strong>Doses Required:</strong> {patient.doses || 3}
        </p>
        <p>
          <strong>Medical Info:</strong> {patient.medicalInfo}
        </p>
        <p>
          <strong>Allergies:</strong> {patient.allergies}
        </p>
        <div className="mt-4">
          <h3 className="font-bold">Doses Taken:</h3>
          <div className="flex gap-2">
            {[...Array(patient.doses || 3)].map((_, index) => (
              <label key={index} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Dose {index + 1}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
