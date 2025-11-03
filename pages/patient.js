import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddPatientForm from '../components/AddPatientForm';

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const handlePatientAdded = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10"
      style={{
        backgroundImage: "url('../images/vax.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-2xl font-bold text-white mb-6">Manage Patients</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl mb-10">
        <AddPatientForm onPatientAdded={handlePatientAdded} />
      </div>
      <h2 className="text-xl font-bold text-white mb-4">Patient List</h2>
      <table className="w-full max-w-4xl bg-white rounded shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Vaccine</th>
            <th className="p-4 text-left">Gender</th>
            <th className="p-4 text-left">Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">{patient.name}</td>
              <td className="p-4">{patient.vaccine}</td>
              <td className="p-4">{patient.Gender}</td>
              <td className="p-4">{patient.bloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => router.push('/dashboard')}
        className="mt-4 bg-gray-500 text-white px-6 py-2 rounded"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
