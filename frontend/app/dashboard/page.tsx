"use client";
import { useEffect, useState } from "react";
import { api, setAuthToken } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const token = getToken();
    setAuthToken(token);
    api.get("/patients/")
      .then((res) => setPatients(res.data))
      .catch(() => alert("Failed to load data"));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Patient Dashboard</h1>
      <ul>
        {patients.map((p: any) => (
          <li key={p.id} className="border p-2 mb-2 rounded">
            {p.name} - {p.contact}
          </li>
        ))}
      </ul>
    </main>
  );
}

