import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import emailjs from 'emailjs-com';

const Attendance = () => {
  const [value, setValue] = useState(new Date());
  const [patients, setPatients] = useState([]);
  const [attendedPatients, setAttendedPatients] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(sessionStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const handleDateChange = (date) => {
    setValue(date);
  };

  const handleAttendanceChange = (index) => {
    const updatedPatients = [...patients];
    const patient = updatedPatients[index];
    patient.attended = !patient.attended; // Toggle attendance
    if (patient.attended) {
      setAttendedPatients([...attendedPatients, patient]);
    } else {
      setAttendedPatients(attendedPatients.filter((p) => p !== patient));
    }
    setPatients(updatedPatients);
  };

  // Function to send reminder email via EmailJS
  const handleSendReminder = (patient) => {
    const vaccine = patient.vaccine;
    const center = patient.center || 'No center assigned'; // Default if center is missing
    const doseDates = patient.doseDates.join(', '); // Join dates into a string

    const templateParams = {
      to_name: patient.name,
      to_email: patient.email,
      vaccine,
      dates: doseDates,
      center_name: center,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Use service ID from .env.local
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_REM, // Use template ID from .env.local
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID // Use user ID from .env.local
      )
      .then(() => {
        alert(`Reminder sent to ${patient.name}!`);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send reminder email. Please try again later.');
      });
  };

  const filteredPatients = patients.filter((patient) => {
    const selectedDate = value.toLocaleDateString();
    return patient.doseDates.some((date) => new Date(date).toLocaleDateString() === selectedDate);
  });

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('../images/vax.jpg')" }}
    ><NavBar role="Medical Staff" />
      <div className="flex items-center justify-center h-full">
        <div className="w-full sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 bg-white/40 backdrop-blur-lg rounded-lg shadow-lg p-8">
          <h2 className="text-4xl text-white font-semibold text-center mb-6">Attendance Tracker</h2>

          {/* Calendar */}
          <div className="mb-6">
            <Calendar onChange={handleDateChange} value={value} className="shadow-xl rounded-lg" />
          </div>

          {/* Patient Table */}
          <div className="overflow-x-auto backdrop-blur-lg rounded-lg shadow-xl mb-6 bg-white/60 text-black">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border text-black">Name</th>
                  <th className="px-4 py-2 border text-black">Vaccine</th>
                  <th className="px-4 py-2 border text-black">Attendance</th>
                  <th className="px-4 py-2 border text-black">Reminder</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={index} className={`${patient.attended ? 'bg-green-200' : ''}`}>
                    <td className="px-4 py-2 border">{patient.name}</td>
                    <td className="px-4 py-2 border">{patient.vaccine}</td>
                    <td className="px-4 py-2 border">
                      <input
                        type="checkbox"
                        checked={patient.attended || false}
                        onChange={() => handleAttendanceChange(index)}
                        className="h-5 w-5"
                      />
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleSendReminder(patient)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Remind
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Return Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => (window.location.href = '/dashboard')}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
