import { useState } from 'react';
import { useRouter } from 'next/router';

export default function VaccinePage() {
  const [vaccineName, setVaccineName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [doses, setDoses] = useState('');
  const [centers, setCenters] = useState('');
  const [expiryDate, setExpiryDate] = useState(''); // New state for expiry date
  const router = useRouter();

  const handleAddVaccine = () => {
    const existingVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    const newVaccine = { 
      name: vaccineName, 
      manufacturer, 
      doses: parseInt(doses, 10), 
      centers: centers.split(',').map((center) => center.trim()),
      expiryDate, // Add expiry date to the vaccine object
    };
    sessionStorage.setItem('vaccines', JSON.stringify([...existingVaccines, newVaccine]));
    setVaccineName('');
    setManufacturer('');
    setDoses('');
    setCenters('');
    setExpiryDate(''); // Reset expiry date
    alert('Vaccine and centers added successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10" 
         style={{ backgroundImage: "url('../images/vax.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-2xl font-bold text-white mb-6">Add Vaccine</h1>
      <div className="bg-white/40 backdrop-blur-md p-6 rounded shadow-md w-full max-w-md">
        <label className="block mb-2 font-medium">Vaccine Name</label>
        <input
          type="text"
          value={vaccineName}
          onChange={(e) => setVaccineName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2 font-medium">Manufacturer</label>
        <input
          type="text"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2 font-medium">Number of Doses</label>
        <input
          type="number"
          value={doses}
          onChange={(e) => setDoses(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2 font-medium">Vaccine Centers (comma-separated)</label>
        <input
          type="text"
          value={centers}
          onChange={(e) => setCenters(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2 font-medium">Expiry Date</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button onClick={handleAddVaccine} className="bg-blue-500 text-white px-6 py-2 rounded w-full mb-2">Add Vaccine</button>
        <button onClick={() => router.push('/dashboard')} className="bg-gray-500 text-white px-6 py-2 rounded w-full">Return to Dashboard</button>
      </div>
    </div>
  );
}
