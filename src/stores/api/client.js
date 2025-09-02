// Normalized base; add /api/v1 if NOT already in REACT_APP_API_URL
const BASE = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");

export function apiUrl(path) {
  return `${BASE}${path}`;
}

export function getToken() {
  if (typeof localStorage === "undefined") return "";
  return localStorage.getItem("admin_access") || "";
}

export async function request(path, { method = "GET", token, headers, ...rest } = {}) {
  const url = apiUrl(path);
  console.log("[API] →", method, url, token ? "(auth)" : "(no auth)");
  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    ...rest,
  });
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) {
    console.warn("[API] ✕", method, url, res.status, json);
    throw new Error(json.message || `HTTP ${res.status}`);
  }
  return json;
}