import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

export default function AllPatients() {
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  return (
    <div
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: `url('../images/vax.jpg')` }} // Ensure vax.jpg is in the public folder
    >
      <NavBar role="Medical Staff" />
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        All Patients
      </h1>

      {patients.length > 0 ? (
        <div className="overflow-auto mx-auto w-4/5 bg-opacity-80 bg-gray-900 rounded-lg shadow-lg">
          <table className="min-w-full bg-transparent rounded-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Age</th>
                <th className="py-2 px-4">Sex</th>
                <th className="py-2 px-4">Blood Group</th>
                <th className="py-2 px-4">Medical Info</th>
                <th className="py-2 px-4">Vaccine</th>
                <th className="py-2 px-4">Dose Dates</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'
                  } text-gray-900 border-b`}
                >
                  <td className="py-2 px-4 text-center">{patient.name}</td>
                  <td className="py-2 px-4 text-center">{patient.age}</td>
                  <td className="py-2 px-4 text-center">{patient.Gender}</td>
                  <td className="py-2 px-4 text-center">
                    {patient.bloodGroup}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {patient.medicalHistory}
                  </td>
                  <td className="py-2 px-4 text-center">{patient.vaccine}</td>
                  <td className="py-2 px-4 text-center">
                    {patient.doseDates.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-white mt-4">
          No patients added yet.
        </p>
      )}

      <button
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mx-auto block"
        onClick={() => router.push('/dashboard')}
      >
        Return to Dashboard
      </button>
    </div>
  );
}
