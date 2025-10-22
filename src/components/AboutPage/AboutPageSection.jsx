import { useEffect, useState, useCallback } from "react";
import EditStaticPage from "./EditStaticPage";

const API_BASE = import.meta.env.VITE_API_URL || "";
const STATIC_PAGES_TOKEN = import.meta.env?.VITE_PAGES_TOKEN || "";

const LIST_ENDPOINT = "/pages";

function getToken() {
  if (STATIC_PAGES_TOKEN) return STATIC_PAGES_TOKEN;

  const candidateKeys = [
    "admin_access",
    "accessToken",
    "token",
    "authToken",
    "jwt",
    "Authorization",
    "admin_refresh",
    "user",
  ];

  for (const k of candidateKeys) {
    let raw = localStorage.getItem(k);
    if (!raw) continue;

    if (/^\s*[{[]/.test(raw)) {
      try {
        const obj = JSON.parse(raw);
        raw =
          obj?.access ||
          obj?.access_token ||
          obj?.token ||
          obj?.jwt ||
          obj?.data?.token ||
          "";
      } catch {
        /* ignore */
      }
    }

    if (raw) {
      const token = raw.replace(/^Bearer\s+/i, "").trim();
      if (token && token.length > 10) {
        return token;
      }
    }
  }
  return "";
}

function stripHtml(html = "") {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

const AboutPageSection = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchPages = useCallback(async () => {
    if (!API_BASE) {
      setError("Missing API base env (REACT_APP_API_URL).");
      setLoading(false);
      return;
    }
    const token = getToken();
    if (!token) {
      setError(
        "Missing bearer token (login first or set REACT_APP_PAGES_TOKEN)."
      );
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_BASE + LIST_ENDPOINT, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        setError("Unauthorized (token invalid / expired). Re‑login.");
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const json = await res.json();
      setPages(Array.isArray(json.data) ? json.data : []);
    } catch (e) {
      setError(e.message || "Failed to load pages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const startCreate = () => {
    setCreating(true);
    setEditing({
      id: null,
      title: "",
      content: "",
      status: "active",
    });
  };

  const startEdit = (p) => {
    setCreating(false);
    setEditing(p);
  };

  const cancelEdit = () => {
    setEditing(null);
    setCreating(false);
  };

  const handleSave = async (page) => {
    setSaving(true);
    setError("");
    const token = getToken();
    try {
      if (!token) throw new Error("Missing bearer token");
      const isNew = !page.id;
      const url = isNew
        ? API_BASE + LIST_ENDPOINT
        : `${API_BASE + LIST_ENDPOINT}/${page.id}`;
      const method = isNew ? "POST" : "PUT";
      const body = isNew
        ? {
            title: page.title.trim(),
            content: page.content,
            status: page.status,
          }
        : { content: page.content, status: page.status };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 401)
        throw new Error("Unauthorized (token invalid / expired)");
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      await res.json().catch(() => {});
      if (isNew) {
        await fetchPages();
      } else {
        setPages((prev) =>
          prev.map((p) =>
            p.id === page.id
              ? { ...p, content: page.content, status: page.status }
              : p
          )
        );
      }
      setEditing(null);
      setCreating(false);
    } catch (e) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <EditStaticPage
        page={editing}
        creating={creating}
        onCancel={cancelEdit}
        onSave={handleSave}
        saving={saving}
      />
    );
  }

  return (
    <div className="main-container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Static Pages</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchPages}
            className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button
            onClick={startCreate}
            className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            + New Page
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 border border-red-300 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 w-32">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && !pages.length && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No pages found.
                </td>
              </tr>
            )}
            {!loading &&
              pages.map((p) => {
                const snippet = stripHtml(p.content || "");
                return (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">
                      {snippet.length > 80
                        ? snippet.slice(0, 80) + "…"
                        : snippet}
                    </td>
                    <td className="px-4 py-2 capitalize">{p.status}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="text-xs px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutPageSection;
