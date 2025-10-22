import axios from "axios";

export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
export const ENDPOINTS = {
  services: "/services",
  upload: "/admin/upload",
};

export const getToken = () =>
  localStorage.getItem("admin_access") ||
  localStorage.getItem("accessToken") ||
  "";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

api.interceptors.request.use((cfg) => {
  const tk = getToken();
  if (tk) cfg.headers.Authorization = `Bearer ${tk}`;
  return cfg;
});

export function extractErr(e, fallback) {
  if (e?.response?.data?.message) return e.response.data.message;
  if (e?.message) return e.message;
  return fallback;
}