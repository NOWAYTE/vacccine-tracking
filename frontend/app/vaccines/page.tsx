"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    patient: "",
    vaccine_name: "",
    dose_number: 1,
    date_administered: "",
    note: "",
  });

  const loadData = () => {
    setLoading(true);
    setError("");
    Promise.all([
      api.get("/api/vaccines/"),
      api.get("/api/patients/"),
    ])
      .then(([vaxRes, patRes]) => {
        setVaccines(vaxRes.data);
        setPatients(patRes.data);
      })
      .catch(() => setError("Failed to load vaccines or patients"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "dose_number" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...form };
      if (!payload.patient) {
        setError("Please select a patient");
        return;
      }
      await api.post("/api/vaccines/", payload);
      setForm({ patient: "", vaccine_name: "", dose_number: 1, date_administered: "", note: "" });
      loadData();
    } catch (err: any) {
      setError(
        err.response?.data ? JSON.stringify(err.response.data) : "Failed to record vaccination"
      );
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Vaccinations</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Record New Vaccination</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded border">
          <select name="patient" value={form.patient} onChange={handleChange} className="p-2 border rounded" required>
            <option value="">Select patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
          <input name="vaccine_name" placeholder="Vaccine name" value={form.vaccine_name} onChange={handleChange} className="p-2 border rounded" required />
          <input type="number" min={1} name="dose_number" placeholder="Dose number" value={form.dose_number} onChange={handleChange} className="p-2 border rounded" required />
          <input type="date" name="date_administered" placeholder="Date administered" value={form.date_administered} onChange={handleChange} className="p-2 border rounded" required />
          <textarea name="note" placeholder="Note (optional)" value={form.note} onChange={handleChange} className="p-2 border rounded sm:col-span-2" rows={3} />
          <div className="sm:col-span-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Record Vaccination</button>
          </div>
        </form>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">All Vaccinations</h2>
          <button onClick={loadData} className="px-3 py-1 text-sm rounded border">Refresh</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {vaccines.map((v) => (
              <li key={v.id} className="border p-3 mb-2 rounded">
                <div className="font-medium">{v.vaccine_name} (Dose {v.dose_number})</div>
                <div className="text-sm text-gray-600">Date: {v.date_administered}</div>
                <div className="text-sm text-gray-600">Patient ID: {v.patient}</div>
                {v.note && <div className="text-sm text-gray-600">Note: {v.note}</div>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
