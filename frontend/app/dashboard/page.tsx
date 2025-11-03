"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [patients, setPatients] = useState<any[]>([]);
  const [vaccines, setVaccines] = useState<any[]>([]);

  useEffect(() => {
    const _ = getAccessToken();
    Promise.all([api.get("/api/patients/"), api.get("/api/vaccines/")])
      .then(([pRes, vRes]) => {
        setPatients(pRes.data);
        setVaccines(vRes.data);
      })
      .catch(() => alert("Failed to load dashboard data"));
  }, []);

  // Aggregations
  const { perDay, topVaccines, doseDist } = useMemo(() => {
    // per-day counts for last 30 days using date_administered (YYYY-MM-DD)
    const today = new Date();
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    const days: string[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(fmt(d));
    }
    const perDayMap: Record<string, number> = Object.fromEntries(days.map((d) => [d, 0]));

    const byName: Record<string, number> = {};
    const byDose: Record<string, number> = {};

    for (const v of vaccines) {
      const date = (v.date_administered || "").slice(0, 10);
      if (perDayMap[date] !== undefined) perDayMap[date] += 1;
      const name = v.vaccine_name || "Unknown";
      byName[name] = (byName[name] || 0) + 1;
      const dose = String(v.dose_number || 0);
      byDose[dose] = (byDose[dose] || 0) + 1;
    }

    const perDay = {
      labels: days,
      datasets: [
        {
          label: "Vaccinations per day (30d)",
          data: days.map((d) => perDayMap[d]),
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.2)",
          tension: 0.25,
        },
      ],
    };

    const nameEntries = Object.entries(byName).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topVaccines = {
      labels: nameEntries.map(([n]) => n),
      datasets: [
        {
          label: "Top vaccines",
          data: nameEntries.map(([, c]) => c as number),
          backgroundColor: ["#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"],
        },
      ],
    };

    const doseKeys = Object.keys(byDose).sort((a, b) => Number(a) - Number(b));
    const doseDist = {
      labels: doseKeys.map((k) => `Dose ${k}`),
      datasets: [
        {
          label: "Doses",
          data: doseKeys.map((k) => byDose[k] as number),
          backgroundColor: ["#60a5fa", "#34d399", "#f472b6", "#fbbf24", "#a78bfa"],
        },
      ],
    };

    return { perDay, topVaccines, doseDist };
  }, [vaccines]);

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/patients" className="px-3 py-2 rounded bg-blue-600 text-white">Patients</Link>
          <Link href="/vaccines" className="px-3 py-2 rounded bg-green-600 text-white">Vaccines</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded border lg:col-span-2">
          <h3 className="font-semibold mb-2">Vaccinations per Day</h3>
          <Line data={perDay} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
        </div>
        <div className="p-4 bg-white rounded border">
          <h3 className="font-semibold mb-2">Dose Distribution</h3>
          <Doughnut data={doseDist} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
        </div>
      </div>

      <div className="p-4 bg-white rounded border mb-8">
        <h3 className="font-semibold mb-2">Top Vaccines</h3>
        <Bar data={topVaccines} options={{ responsive: true, plugins: { legend: { display: false } } }} />
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

