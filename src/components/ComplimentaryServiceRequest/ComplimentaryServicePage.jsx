import React, { useState, useMemo } from "react";

// ---- Static mode flag ----
const STATIC_MODE = true;

// Sample static data (from your example)
const STATIC_ROWS = [
  {
    id: "YiqPD9WsrAUYrWncN-aZc",
    comp_service_id: "Gv3J1jWA86QvhPWTeYXpl",
    name: "Pankaj",
    email: "pankaj@gmail.com",
    mobile: "+919898989898",
    address: "abc",
    notes: "xyz",
    status: "pending",
    createdAt: "2025-08-20T06:51:12.751Z",
  },
  {
    id: "d3OiP2KIIUosE0utv7A5n",
    comp_service_id: "Gv3J1jWA86QvhPWTeYXpl",
    name: "Pankaj",
    email: "pankaj@gmail.com",
    mobile: "+919898989898",
    address: "abc2",
    notes: "xyz2",
    status: "pending",
    createdAt: "2025-08-20T06:51:47.704Z",
  },
  {
    id: "8QJ6q2_Mt-P1x9w2zVhU_",
    comp_service_id: "Gv3J1jWA86QvhPWTeYXpl",
    name: "Pankaj",
    email: "pankaj@gmail.com",
    mobile: "+919898989898",
    address: "abc3",
    notes: "xyz3",
    status: "pending",
    createdAt: "2025-08-20T06:52:52.092Z",
  },
];

const STATUSES = ["pending", "contacted", "completed", "cancelled"];

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

export default function ComplimentaryServicePage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [rows, setRows] = useState(STATIC_ROWS);

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    notes: "",
    status: "pending",
  });

  function startEdit(row) {
    setEditingId(row.id);
    setDraft({
      name: row.name,
      email: row.email,
      mobile: row.mobile,
      address: row.address,
      notes: row.notes,
      status: row.status,
    });
  }
  function cancelEdit() {
    setEditingId(null);
  }
  function saveEdit() {
    setRows((r) =>
      r.map((row) => (row.id === editingId ? { ...row, ...draft } : row))
    );
    setEditingId(null);
  }

  function updateStatus(id, newStatus) {
    if (!STATIC_MODE) return;
    // If the row is currently being edited, just update draft
    if (editingId === id) {
      setDraft((d) => ({ ...d, status: newStatus }));
    }
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  }

  function deleteReq(id) {
    if (!STATIC_MODE) return;
    if (editingId === id) setEditingId(null);
    setRows((r) => r.filter((row) => row.id !== id));
  }

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (search) {
        const s = search.toLowerCase();
        if (
          !(
            r.name.toLowerCase().includes(s) ||
            r.email.toLowerCase().includes(s) ||
            r.mobile.toLowerCase().includes(s)
          )
        )
          return false;
      }
      if (status && r.status !== status) return false;
      if (serviceId && r.comp_service_id !== serviceId) return false;
      return true;
    });
  }, [rows, search, status, serviceId]);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  React.useEffect(() => {
    setPage(1);
  }, [search, status, serviceId]);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold flex items-center gap-3">
        Complimentary Service Requests
        {STATIC_MODE && (
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-200 text-gray-700">
            Static Preview
          </span>
        )}
      </h2>

      <div className="flex flex-wrap gap-3 items-end">
        <Filter label="Search">
          <input
            className="border px-3 py-2 rounded text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name / email / mobile"
          />
        </Filter>
        <Filter label="Status">
          <select
            className="border px-3 py-2 rounded text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Filter>
        <Filter label="Service ID">
          <input
            className="border px-3 py-2 rounded text-sm"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value.trim())}
            placeholder="comp_service_id"
          />
        </Filter>
        <button
          type="button"
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
              <Th>Mobile</Th>
              <Th>Address</Th>
              <Th>Notes</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No requests
                </td>
              </tr>
            )}
            {paginated.map((r) => {
              const isEditing = editingId === r.id;
              return (
                <tr key={r.id} className="border-t last:border-b hover:bg-gray-50">
                  <Td>
                    {isEditing ? (
                      <Input
                        value={draft.name}
                        onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
                      />
                    ) : (
                      r.name
                    )}
                  </Td>
                  <Td>
                    {isEditing ? (
                      <Input
                        value={draft.email}
                        onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
                      />
                    ) : (
                      r.email
                    )}
                  </Td>
                  <Td>
                    {isEditing ? (
                      <Input
                        value={draft.mobile}
                        onChange={(v) => setDraft((d) => ({ ...d, mobile: v }))}
                      />
                    ) : (
                      r.mobile
                    )}
                  </Td>
                  <Td>
                    {isEditing ? (
                      <Input
                        value={draft.address}
                        onChange={(v) => setDraft((d) => ({ ...d, address: v }))}
                      />
                    ) : (
                      r.address
                    )}
                  </Td>
                  <Td className="max-w-[180px]" title={r.notes}>
                    {isEditing ? (
                      <textarea
                        className="border w-full rounded px-2 py-1 text-xs resize-none"
                        rows={2}
                        value={draft.notes}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, notes: e.target.value }))
                        }
                      />
                    ) : (
                      <span className="truncate inline-block max-w-[170px]">
                        {r.notes}
                      </span>
                    )}
                  </Td>
                  <Td>
                    {isEditing ? (
                      <select
                        className="border px-2 py-1 rounded text-xs"
                        value={draft.status}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, status: e.target.value }))
                        }
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        className="border px-2 py-1 rounded text-xs"
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    )}
                  </Td>
                  <Td>{formatDate(r.createdAt)}</Td>
                  <Td className="space-x-2">
                    {!isEditing && (
                      <>
                        <button
                          className="text-blue-600 text-xs hover:underline"
                          onClick={() => startEdit(r)}
                          disabled={editingId && editingId !== r.id}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 text-xs hover:underline"
                          onClick={() => deleteReq(r.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {isEditing && (
                      <>
                        <button
                          className="text-green-600 text-xs hover:underline"
                          onClick={saveEdit}
                        >
                          Update
                        </button>
                        <button
                          className="text-gray-600 text-xs hover:underline"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
        Static mode: edits & updates affect only local state (no API calls).
      </p>
    </div>
  );
}

function Filter({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-medium">{label}</label>
      {children}
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
function Input({ value, onChange }) {
  return (
    <input
      className="border rounded px-2 py-1 text-xs w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}