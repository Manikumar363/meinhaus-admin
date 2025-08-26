import React, { useState, useMemo, useEffect } from "react";

// Static sample data (from provided response)
const STATIC_QUERIES = [
  {
    id: "H9wYKXRdPDjW7g_VKwUun",
    name: "Manikumar",
    email: "manikumar@gmail.com",
    message: "I will not tell",
    createdAt: "2025-08-20T12:48:15.080Z",
  },
  {
    id: "0dj1QuEW43cze6wFxjt6S",
    name: "Manikumar",
    email: "manikumar@gmail.com",
    message: "I will not tell",
    createdAt: "2025-08-20T12:47:37.076Z",
  },
  {
    id: "VThCcWiJfAFV43pv9_3Fh",
    name: "Manikumar",
    email: "manikumar@gmail.com",
    message: "I will not tell",
    createdAt: "2025-08-20T12:46:25.538Z",
  },
];

const PAGE_SIZE = 10;

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

export default function QueryPageSection() {
  const [queries, setQueries] = useState(STATIC_QUERIES);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Reset to page 1 on search change
  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return queries;
    return queries.filter(
      (q) =>
        q.name.toLowerCase().includes(s) ||
        q.email.toLowerCase().includes(s) ||
        q.message.toLowerCase().includes(s)
    );
  }, [queries, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  function deleteLocal(id) {
    if (!window.confirm("Delete this query locally?")) return;
    setQueries((qs) => qs.filter((q) => q.id !== id));
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold flex items-center gap-3">
        Queries
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-200 text-gray-700">
          Static Preview
        </span>
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
          disabled
          className="px-4 py-2 rounded text-sm bg-gray-300 cursor-not-allowed"
          title="Disabled in static mode"
        >
          Refresh
        </button>
      </div>

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
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No queries
                </td>
              </tr>
            )}
            {paginated.map((q) => (
              <tr
                key={q.id}
                className="border-t last:border-b hover:bg-gray-50"
              >
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
                    onClick={() => deleteLocal(q.id)}
                  >
                    Delete
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-3 text-sm">
        <button
          disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Static mode: no network requests. Replace with live fetch (GET /query?page=1) and real DELETE later.
      </p>
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