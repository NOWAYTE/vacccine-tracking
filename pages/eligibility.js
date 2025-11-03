import { useState } from 'react';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

export default function EligibilityPage() {
  const [age, setAge] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const router = useRouter();

  const conditionMessages = {
    allergy: 'Consult a doctor before receiving vaccines due to health conditions.',
    immunocompromised: 'Consult a doctor for specialized vaccine recommendations.',
    pregnancy: 'Recommended: Tdap and Flu vaccines, consult your doctor.',
    diabetes: 'Recommended: Annual Flu vaccine and consider Pneumococcal vaccines.',
    amputation: 'Consult a doctor for vaccine recommendations based on your specific condition.',
  };
  
  const handleCheckEligibility = () => {
    let recommendationMessage = 'Eligible for all vaccines.';
    
    if (age < 12) {
      recommendationMessage = 'Eligible for pediatric vaccines only.';
    } else if (age > 65) {
      recommendationMessage = 'Recommended: Flu and Pneumococcal vaccines.';
    } else {
      for (const [condition, message] of Object.entries(conditionMessages)) {
        if (healthCondition.toLowerCase().includes(condition)) {
          recommendationMessage = message;
          break;
        }
      }
    }
    
    setRecommendation(recommendationMessage);
  };

  return (
    <div
    className="bg-cover bg-center h-screen"
    style={{ backgroundImage: "url('../images/vax.jpg')" }}
  >
      <NavBar role="Medical Staff" />
      
      <div className="flex items-center justify-center h-full">
        <div className="w-full sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 bg-white/40 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Vaccine Eligibility Check
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckEligibility();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Health Conditions (if any)
            </label>
            <textarea
              value={healthCondition}
              onChange={(e) => setHealthCondition(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe any health conditions"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Check Eligibility
          </button>
        </form>

        {recommendation && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-lg font-bold text-blue-800 mb-2">
              Recommendation:
            </h2>
            <p className="text-gray-700">{recommendation}</p>
          </div>
        )}

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </button>
        </div>
      </div>
    </div>
  );
}
