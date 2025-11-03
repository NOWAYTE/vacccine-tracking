import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

export default function AllVaccines() {
  const [vaccines, setVaccines] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setVaccines(storedVaccines);
  }, []);

  // Function to remove a vaccine
  const handleRemoveVaccine = (vaccineIndex) => {
    const updatedVaccines = vaccines.filter((_, index) => index !== vaccineIndex);
    sessionStorage.setItem('vaccines', JSON.stringify(updatedVaccines));
    setVaccines(updatedVaccines); // Update the state to reflect the changes
  };

  return (
    <div
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: `url('../images/vax.jpg')` }} // Ensure vax.jpg is placed in the public folder
    >
      <NavBar role="Medical Staff" />
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        All Vaccines
      </h1>

      {vaccines.length > 0 ? (
        <div className="overflow-auto mx-auto w-4/5 bg-opacity-80 bg-gray-900 rounded-lg shadow-lg">
          <table className="min-w-full bg-transparent rounded-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Vaccine Name</th>
                <th className="py-2 px-4">Doses</th>
                <th className="py-2 px-4">Manufacturer</th>
                <th className="py-2 px-4">Expiry Date</th>
                <th className="py-2 px-4">Actions</th> {/* New column for the Remove button */}
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'
                  } text-gray-900 border-b`}
                >
                  <td className="py-2 px-4 text-center">{vaccine.name}</td>
                  <td className="py-2 px-4 text-center">{vaccine.doses}</td>
                  <td className="py-2 px-4 text-center">{vaccine.manufacturer}</td>
                  <td className="py-2 px-4 text-center">{vaccine.expiryDate || 'N/A'}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleRemoveVaccine(index)} // Remove vaccine when clicked
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td> {/* Remove button */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-white mt-4">
          No vaccines added yet.
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
