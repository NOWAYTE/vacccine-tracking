import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

export default function AddPatientForm({ onPatientAdded }) {
  const [name, setName] = useState('');
  const [Gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [email, setEmail] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [doseDates, setDoseDates] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [centers, setCenters] = useState([]);

  // Fetch vaccines from sessionStorage
  useEffect(() => {
    const storedVaccines = JSON.parse(sessionStorage.getItem('vaccines')) || [];
    setVaccines(storedVaccines);
  }, []);

  // Handle vaccine change to dynamically set centers and dose dates
  const handleVaccineChange = (vaccineName) => {
    setSelectedVaccine(vaccineName);
    const vaccine = vaccines.find((v) => v.name === vaccineName);
    if (vaccine) {
      setDoseDates(new Array(vaccine.doses).fill(''));
      setCenters(vaccine.centers || []);
    }
  };

  const handleDateChange = (index, value) => {
    const updatedDates = [...doseDates];
    updatedDates[index] = value;
    setDoseDates(updatedDates);
  };

  const generatePassword = () => Math.random().toString(36).slice(-8); // Generate random 8-character password

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!selectedVaccine || !selectedCenter || doseDates.some((date) => !date)) {
      alert('Please select a vaccine, center, and complete all dose dates.');
      return;
    }

    const password = generatePassword();

    const newPatient = {
      name,
      Gender,
      age,
      medicalHistory,
      bloodGroup,
      email,
      vaccine: selectedVaccine,
      center: selectedCenter,
      password,
      doseDates,
    };

    // Save patient in sessionStorage
    const existingPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    sessionStorage.setItem('patients', JSON.stringify([...existingPatients, newPatient]));

    // Send email
    const emailContent = {
      to_name: name,
      to_email: email,
      vaccine_name: selectedVaccine,
      center_name: selectedCenter,
      doses: doseDates.length,
      dates: doseDates.join(', '),
      password,
    };

    emailjs
  .send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // EmailJS service ID from .env.local
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // EmailJS template ID from .env.local
    emailContent,
    process.env.NEXT_PUBLIC_EMAILJS_USER_ID // EmailJS user ID from .env.local
  )
  .then(() => {
    alert('Patient added and email sent successfully!');
    onPatientAdded(newPatient); // Update parent component
  })
  .catch((err) => {
    alert('Failed to send email. Please try again.');
    console.error(err);
  });


    // Reset form
    setName('');
    setGender('');
    setAge('');
    setMedicalHistory('');
    setBloodGroup('');
    setEmail('');
    setSelectedVaccine('');
    setSelectedCenter('');
    setDoseDates([]);
  };

  return (
    <form onSubmit={handleAddPatient} className="bg-white/40 backdrop-blur-md p-6 rounded shadow-md w-full max-w-2xl">
      <label className="block mb-2 font-medium">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Gender</label>
      <select
        value={Gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <label className="block mb-2 font-medium">Age</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Medical History</label>
      <textarea
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Blood Group</label>
      <select
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="" disabled>Select blood group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
      <label className="block mb-2 font-medium">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2 font-medium">Vaccine</label>
      <select
        value={selectedVaccine}
        onChange={(e) => handleVaccineChange(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="" disabled>Select a vaccine</option>
        {vaccines.map((vaccine) => (
          <option key={vaccine.name} value={vaccine.name}>
            {vaccine.name}
          </option>
        ))}
      </select>
      {selectedVaccine && (
        <div>
          <label className="block mb-2 font-medium">Vaccine Center</label>
          <select
            value={selectedCenter}
            onChange={(e) => setSelectedCenter(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="" disabled>Select a center</option>
            {centers.map((center, index) => (
              <option key={index} value={center}>
                {center}
              </option>
            ))}
          </select>
        </div>
      )}
      {doseDates.map((date, index) => (
        <div key={index}>
          <label className="block mb-2 font-medium">Dose {index + 1} Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(index, e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded w-full">
        Add Patient
      </button>
    </form>
  );
}
