import { useRouter } from 'next/router';

export default function NavBar({ role }) {
  const router = useRouter();

  if (role !== 'Medical Staff') return null; // Hide navbar for patients

  return (
    <nav className="bg-blue-300 bg-opacity-80 text-white p-4 shadow-md backdrop-blur-md">
      <div className="flex gap-6 justify-center">
        <button
          onClick={() => router.push('/dashboard')}
          className={`py-2 px-4 rounded transition ${
            router.pathname === '/dashboard'
              ? 'bg-blue-500 text-white font-bold'
              : 'hover:bg-blue-400 hover:text-white'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => router.push('/all-vaccines')}
          className={`py-2 px-4 rounded transition ${
            router.pathname === '/all-vaccines'
              ? 'bg-blue-500 text-white font-bold'
              : 'hover:bg-blue-400 hover:text-white'
          }`}
        >
          All Vaccines
        </button>
        <button
          onClick={() => router.push('/all-patients')}
          className={`py-2 px-4 rounded transition ${
            router.pathname === '/all-patients'
              ? 'bg-blue-500 text-white font-bold'
              : 'hover:bg-blue-400 hover:text-white'
          }`}
        >
          All Patients
        </button>
        <button
          onClick={() => router.push('/attendance')}
          className={`py-2 px-4 rounded transition ${
            router.pathname === '/attendance'
              ? 'bg-blue-500 text-white font-bold'
              : 'hover:bg-blue-400 hover:text-white'
          }`}
        >
          Attendance Checker
        </button>
        <button
          onClick={() => router.push('/eligibility')}
          className={`py-2 px-4 rounded transition ${
            router.pathname === '/eligibility'
              ? 'bg-blue-500 text-white font-bold'
              : 'hover:bg-blue-400 hover:text-white'
          }`}
        >
          Vaccine Eligibility
        </button>
        <button
          onClick={() => router.push('/all-centers')}
          className={`py-2 px-4 rounded transition ${
            router.pathname === '/all-centers'
              ? 'bg-blue-500 text-white font-bold'
              : 'hover:bg-blue-400 hover:text-white'
          }`}
        >
          All Centers
        </button>
      </div>
    </nav>
  );
}
