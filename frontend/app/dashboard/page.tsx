"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Interceptor in api.ts will add the Authorization header automatically
    const _ = getAccessToken();
    api
      .get("/api/patients/")
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

