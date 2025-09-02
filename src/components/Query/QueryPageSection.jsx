import React, { useState, useMemo, useEffect, useRef } from "react";
import { fetchQueries, deleteQuery } from "../../stores/api/query/queries";

const PAGE_SIZE = 10;

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

// Robust token resolver (scan multiple keys + JSON blobs)
function resolveToken() {
  if (typeof localStorage === "undefined") return "";
  const candidates = [
    "token",
    "access_token",
    "authToken",
    "auth_token",
    "adminToken",
    "Authorization",
    "user",
    "authUser",
    "auth",
    "persist:root",
  ];
  for (const key of candidates) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    if (/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(raw.trim())) {
      return raw.trim();
    }
    // JSON blob
    if (raw.trim().startsWith("{")) {
      try {
        const obj = JSON.parse(raw);
        if (typeof obj.token === "string") return obj.token;
        if (typeof obj.access_token === "string") return obj.access_token;
        if (typeof obj.authToken === "string") return obj.authToken;
        if (obj.state && typeof obj.state === "object") {
          const nested = JSON.stringify(obj.state);
          const match = nested.match(/"token":"([^"]+)"/);
            if (match) return match[1];
        }
      } catch {
        /* ignore */
      }
    }
  }
  return "";
}

export default function QueryPageSection() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [hasNext, setHasNext] = useState(true);
  const abortRef = useRef(null);

  // Try to get token immediately + poll briefly (covers async login)
  useEffect(() => {
    let attempts = 0;
    function attempt() {
      const t = resolveToken();
      if (t) {
        setToken(t);
        return;
      }
      attempts += 1;
      if (attempts < 20) {
        setTimeout(attempt, 250);
      }
    }
    attempt();

    // Listen to storage events (another tab / later set)
    function onStorage() {
      const t = resolveToken();
      if (t) setToken(t);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Manual debug (press F12 to see). Remove after confirming.
  useEffect(() => {
    if (!token) {
      const keys = Object.keys(localStorage || {});
      console.debug("[Query] LocalStorage keys", keys);
    } else {
      console.debug("[Query] Using token (length)", token.length);
    }
  }, [token]);

  // Fetch queries when page or token changes
  useEffect(() => {
    abortRef.current?.abort();
    const c = new AbortController();
    abortRef.current = c;
    (async () => {
      setLoading(true); setError("");
      try {
        const data = await fetchQueries(page, token);
        setQueries(data);
        setHasNext(data.length === PAGE_SIZE);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
    return () => c.abort();
  }, [page, token]);

  // Reset to page 1 on new search
  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return queries;
    return queries.filter(
      (q) =>
        q.name?.toLowerCase().includes(s) ||
        q.email?.toLowerCase().includes(s) ||
        q.message?.toLowerCase().includes(s)
    );
  }, [queries, search]);

  const showingCount = filtered.length;

  async function handleDelete(id) {
    if (!window.confirm("Delete this query?")) return;
    const prev = queries;
    setQueries((qs) => qs.filter((q) => q.id !== id));
    try {
      await deleteQuery(id, token);
    } catch (e) {
      alert(`Delete failed: ${e.message}`);
      setQueries(prev);
    }
  }

  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }
  function nextPage() {
    if (hasNext) setPage((p) => p + 1);
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold flex items-center gap-3">
        Queries
      </h2>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col">
          <label className="text-xs font-medium">Search</label>
          <input
            className="border px-3 py-2 rounded text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name / email / message"
          />
        </div>
        <button
          type="button"
          onClick={async () => {
            setLoading(true);
            try {
              setError("");
              const data = await fetchQueries(page, token);
              setQueries(data);
              setHasNext(data.length === PAGE_SIZE);
            } catch (e) {
              setError(e.message);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
          className="px-4 py-2 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-600 border border-red-200 bg-red-50 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <div className="overflow-auto border rounded bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Message</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 font-medium">
                  No queries
                </td>
              </tr>
            )}
            {!loading &&
              filtered.map((q) => (
                <tr key={q.id} className="border-t last:border-b hover:bg-gray-50">
                  <Td>{q.name}</Td>
                  <Td>{q.email}</Td>
                  <Td className="max-w-[260px]" title={q.message}>
                    <span className="truncate inline-block max-w-[250px]">
                      {q.message}
                    </span>
                  </Td>
                  <Td>{formatDate(q.createdAt)}</Td>
                  <Td>
                    <button
                      className="text-red-600 text-xs hover:underline"
                      onClick={() => handleDelete(q.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </Td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <button
          disabled={page <= 1 || loading}
          onClick={prevPage}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>
        <span>
          Page {page} {showingCount ? `• ${showingCount} items` : ""}
        </span>
        <button
          disabled={!hasNext || loading || filtered.length < PAGE_SIZE}
          onClick={nextPage}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="text-left font-semibold px-3 py-2 text-xs uppercase tracking-wide">
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-3 py-2 align-top ${className}`}>{children}</td>;
}