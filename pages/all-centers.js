import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

export default function AllCenters() {
  const [vaccines, setVaccines] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setVaccines(storedVaccines);
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('../images/vax.jpg')" }}>
      <NavBar role="Medical Staff" />
      <div className="flex flex-col items-center py-10">
        <h1 className="text-2xl font-bold text-white mb-6">All Vaccine Centers</h1>
        <div className="bg-white/40 backdrop-blur-md p-6 rounded shadow-md w-full max-w-4xl">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4">Vaccine Name</th>
                <th className="py-2 px-4">Centers</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 text-center">{vaccine.name}</td>
                  <td className="py-2 px-4 text-center">{(vaccine.centers || []).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => router.push('/dashboard')} className="mt-6 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mx-auto block">Return to Dashboard</button>
        </div>
      </div>
    </div>
  );
}
