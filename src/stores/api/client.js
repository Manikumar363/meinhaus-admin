// Normalized base; add /api/v1 if NOT already in REACT_APP_API_URL
const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export function apiUrl(path) {
  return `${BASE}${path}`;
}

export function sanitizeToken(val) {
  if (!val) return "";
  let t = String(val).trim();

  // Strip "Bearer "
  t = t.replace(/^Bearer\s+/i, "");

  // Remove wrapping quotes
  t = t.replace(/^"(.*)"$/, "$1");

  return t;
}

export function getToken() {
  if (typeof localStorage === "undefined") return "";

  // 1) Direct keys
  const directKeys = ["admin_access", "access_token", "token", "authToken"];
  for (const k of directKeys) {
    const v = localStorage.getItem(k);
    if (v) return sanitizeToken(v);
  }

  // 2) redux-persist root (nested JSON strings)
  const root = localStorage.getItem("persist:root");
  if (root) {
    try {
      const parsed = JSON.parse(root);
      // common slice keys
      const authRaw = parsed.auth || parsed.user || "";
      if (authRaw && typeof authRaw === "string") {
        const auth = JSON.parse(authRaw);
        const cand = auth.accessToken || auth.token || auth.admin_access;
        if (cand) return sanitizeToken(cand);
      }
    } catch {/* ignore */}
  }

  return "";
}

// Generic request (adds Authorization header automatically)
export async function request(path, { method = "GET", params, headers, body, json, token, ...rest } = {}) {
  let url = apiUrl(path);
  if (params) {
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) usp.append(k, String(v));
    });
    const qs = usp.toString();
    if (qs) url += `?${qs}`;
  }

  const t = sanitizeToken(token || getToken());
  const baseHeaders = {
    Accept: "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
    ...(headers || {}),
  };

  // Handle JSON vs FormData
  let finalBody = body;
  const isFD = finalBody instanceof FormData || json instanceof FormData;
  if (!isFD && json !== undefined && finalBody === undefined) {
    baseHeaders["Content-Type"] = baseHeaders["Content-Type"] || "application/json";
    finalBody = JSON.stringify(json);
  }
  if (isFD) {
    if ("Content-Type" in baseHeaders) delete baseHeaders["Content-Type"];
    finalBody = finalBody || json;
  }

  const res = await fetch(url, { method, headers: baseHeaders, body: finalBody, ...rest });
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const err = new Error((isJson && (data?.message || data?.error)) || `HTTP ${res.status}`);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}