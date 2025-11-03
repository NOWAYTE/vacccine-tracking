import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the password is the default one
    if (password === 'Staff001') {
      alert('Login Successful!');
      router.push('/dashboard'); // Redirect to the Dashboard
    } else {
      alert('Invalid password!');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('../images/vax.jpg')" }}>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-transparent via-blue-500 to-transparent">
        <div className="bg-white bg-opacity-40 p-6 rounded-lg shadow-lg backdrop-blur-md max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">Welcome to Vaxin8</h1>
          <p className="text-center text-lg text-blue-800 mb-6">Advancing the human race</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter your password"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
