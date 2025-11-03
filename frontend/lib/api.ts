import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token automatically, but skip for token obtain/refresh endpoints
api.interceptors.request.use((config) => {
  const url = config.url || "";
  const skipAuthHeader = url.includes("/api/token/");

  if (!skipAuthHeader && typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

