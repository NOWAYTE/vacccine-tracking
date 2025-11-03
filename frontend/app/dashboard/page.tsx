"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export default function Dashboard() {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    // Interceptor in api.ts will add the Authorization header automatically
    const _ = getAccessToken();
    api
      .get("/api/patients/")
      .then((res) => setPatients(res.data))
      .catch(() => alert("Failed to load patients"));
  }, []);

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/patients" className="px-3 py-2 rounded bg-blue-600 text-white">Patients</Link>
          <Link href="/vaccines" className="px-3 py-2 rounded bg-green-600 text-white">Vaccines</Link>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Recent Patients</h2>
      <ul>
        {patients.map((p: any) => (
          <li key={p.id} className="border p-3 mb-2 rounded">
            <div className="font-medium">{p.first_name} {p.last_name}</div>
            <div className="text-sm text-gray-600">Gender: {p.gender} • DOB: {p.dob}</div>
            <div className="text-sm text-gray-600">Phone: {p.phone || "-"} • Email: {p.email || "-"}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}

