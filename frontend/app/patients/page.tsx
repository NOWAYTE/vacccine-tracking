"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "M",
    phone: "",
    email: "",
  });

  const loadPatients = () => {
    setLoading(true);
    setError("");
    api
      .get("/api/patients/")
      .then((res) => setPatients(res.data))
      .catch(() => setError("Failed to load patients"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...form };
      await api.post("/api/patients/", payload);
      setForm({ first_name: "", last_name: "", dob: "", gender: "M", phone: "", email: "" });
      loadPatients();
    } catch (err: any) {
      setError(
        err.response?.data ? JSON.stringify(err.response.data) : "Failed to add patient"
      );
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Patients</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Add New Patient</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded border"
        >
          <input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="DOB"
            value={form.dob}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <div className="sm:col-span-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Add Patient
            </button>
          </div>
        </form>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">All Patients</h2>
          <button onClick={loadPatients} className="px-3 py-1 text-sm rounded border">
            Refresh
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {patients.map((p) => (
              <li key={p.id} className="border p-3 mb-2 rounded">
                <div className="font-medium">
                  {p.first_name} {p.last_name}
                </div>
                <div className="text-sm text-gray-600">Gender: {p.gender} • DOB: {p.dob}</div>
                <div className="text-sm text-gray-600">
                  Phone: {p.phone || "-"} • Email: {p.email || "-"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
