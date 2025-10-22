import React, { useState, useMemo, useEffect, useRef } from "react";
import { fetchQueries, deleteQuery } from "../../stores/api/query/queries";
import { EyeIcon, TrashIcon } from "lucide-react";
import { getToken } from "../../stores/api/client";

const PAGE_SIZE = 10;

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
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
  const [viewing, setViewing] = useState(null); // currently opened query for "View" dialog
  const [pendingDelete, setPendingDelete] = useState(null); // query selected for deletion
  const [deleting, setDeleting] = useState(false);

  // Try to get token immediately + react to storage changes
  useEffect(() => {
    setToken(getToken());
    function onStorage() {
      const t = getToken();
      if (t) setToken(t);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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

  function requestDelete(q) {
    setPendingDelete(q);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    const id = pendingDelete.id;
    const prev = queries;
    setQueries(qs => qs.filter(q => q.id !== id));
    try {
      await deleteQuery(id, token);
    } catch (e) {
      alert(`Delete failed: ${e.message}`);
      setQueries(prev);
    } finally {
      setDeleting(false);
      setPendingDelete(null);
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
                      className="text-blue-600 text-xs hover:underline mr-3"
                      onClick={() => setViewing(q)}
                    >
                      <EyeIcon className="inline-block mr-1" size={18} />
                    </button>
                    <button
                      className="text-red-600 text-xs hover:underline"
                      onClick={() => requestDelete(q)}
                      disabled={loading}
                    >
                      <TrashIcon className="inline-block mr-1" size={18} />
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

      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-lg">Query Details</h3>
              <button
                onClick={() => setViewing(null)}
                className="text-gray-500 hover:text-gray-800 text-sm"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-4 overflow-auto text-sm">
              <DetailRow label="Name" value={viewing.name} />
              <DetailRow label="Email" value={viewing.email} />
              <DetailRow label="Created" value={formatDate(viewing.createdAt)} />
              <div>
                <div className="font-medium mb-1">Message</div>
                <div className="whitespace-pre-wrap break-words text-gray-700 border rounded p-3 bg-gray-50 max-h-72 overflow-auto">
                  {viewing.message}
                </div>
              </div>
            </div>
            <div className="px-5 py-3 border-t flex justify-end gap-2">
              <button
                onClick={() => {
                  if (navigator?.clipboard) {
                    navigator.clipboard.writeText(viewing.message || "");
                  }
                }}
                className="px-3 py-1 text-xs rounded border bg-gray-50 hover:bg-gray-100"
              >
                Copy Message
              </button>
              <button
                onClick={() => setViewing(null)}
                className="px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
            <div className="px-5 py-4 border-b font-semibold text-sm">
              Delete Query
            </div>
            <div className="px-5 py-4 text-sm text-gray-700 space-y-2">
              <p>
                Are you sure you want to delete this query
                {pendingDelete.name ? (
                  <> from <span className="font-medium">{pendingDelete.name}</span>?</>
                ) : "?"}
              </p>
              <p className="text-xs text-gray-500">
                This action cannot be undone.
              </p>
            </div>
            <div className="px-5 py-3 border-t flex justify-end gap-2">
              <button
                onClick={() => !deleting && setPendingDelete(null)}
                className="px-3 py-1 rounded border text-xs bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-3 py-1 rounded text-xs bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
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

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="font-medium">{label}</span>
      <span className="text-gray-700 break-words">{value || "—"}</span>
    </div>
  );
}