import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Calendar styles
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalVaccines, setTotalVaccines] = useState(0);
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateDetails, setSelectedDateDetails] = useState([]);
  const router = useRouter();

  const fetchAppointments = () => {
    const patientsData = JSON.parse(sessionStorage.getItem('patients')) || [];
    const vaccinesData = JSON.parse(sessionStorage.getItem('vaccines')) || [];

    setTotalPatients(patientsData.length);
    setTotalVaccines(vaccinesData.length);

    const appointmentsData = {};
    patientsData.forEach((patient) => {
      if (patient.doseDates) {
        patient.doseDates.forEach((date) => {
          if (!appointmentsData[date]) {
            appointmentsData[date] = [];
          }
          appointmentsData[date].push({
            name: patient.name,
            vaccine: patient.vaccine,
            email: patient.email,
          });
        });
      }
    });

    setAppointments(appointmentsData);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    setSelectedDate(date);
    setSelectedDateDetails(appointments[dateString] || []);
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      const appointmentCount = appointments[dateString]?.length || 0;

      if (appointmentCount > 0) {
        return (
          <div className="text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
            {appointmentCount}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/vax.jpg')" }}>
      <NavBar role="Medical Staff" />

      {/* Vaccine and Patients Cards */}
      <div className="flex justify-around gap-6 p-6">
        <div className="p-6 bg-white bg-opacity-50 backdrop-blur-md rounded shadow-md text-center w-1/3">
          <h2 className="text-lg font-bold">Total Vaccines</h2>
          <p className="text-2xl">{totalVaccines}</p>
        </div>
        <div className="p-6 bg-white bg-opacity-50 backdrop-blur-md rounded shadow-md text-center w-1/3">
          <h2 className="text-lg font-bold">Total Patients</h2>
          <p className="text-2xl">{totalPatients}</p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="flex justify-center items-center p-6">
  <Calendar
    className="w-[80%] h-[auto]"
    value={selectedDate}
    onChange={handleDateClick}
    tileContent={getTileContent}
    showDoubleView={true} // Enables two months side by side
    selectRange={false} // Ensures single date selection
  />
</div>

      {/* Selected Date Details */}
      <div className="p-6 bg-white bg-opacity-50 backdrop-blur-md rounded shadow-md text-center">
        <h3 className="text-lg font-bold text-center">Appointments on {selectedDate.toDateString()}</h3>
        {selectedDateDetails.length > 0 ? (
          <ul className="list-disc p-4">
            {selectedDateDetails.map((detail, index) => (
              <li key={index} className="p-2">
                <strong>{detail.name}</strong> - {detail.vaccine} (<em>{detail.email}</em>)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No appointments scheduled for this date.</p>
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center items-center gap-6 p-6">
        <button
          onClick={() => router.push('/vaccine')}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded shadow-md hover:bg-blue-600 transition"
        >
          Add Vaccine
        </button>
        <button
          onClick={() => router.push('/patient')}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded shadow-md hover:bg-green-600 transition"
        >
          Add Patient
        </button>
      </div>
    </div>
  );
}
