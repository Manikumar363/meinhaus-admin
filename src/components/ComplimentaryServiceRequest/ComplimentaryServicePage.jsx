import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import EditRequestDialog from "./EditRequestDialog";
import {
  fetchCompServiceRequests,
  updateCompServiceRequestStatus,
  deleteCompServiceRequest,
} from "../../stores/api/compServiceRequest/compServiceRequests";

const STATUSES = ["pending", "contacted", "completed", "cancelled"];
const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE = 300;

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

export default function ComplimentaryServicePage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [page, setPage] = useState(1);
  const [token, setToken] = useState("");

  // Abort controller (fixes previous unused warning)
  const abortRef = useRef(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const raw =
        localStorage.getItem("token") ||
        localStorage.getItem("access_token") ||
        "";
      setToken(raw || "");
    }
  }, []);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedSearch(search.trim()),
      SEARCH_DEBOUNCE
    );
    return () => clearTimeout(t);
  }, [search]);

  const loadData = useCallback(async () => {
    // Fire request even if token missing (so you see 401) or serviceId empty (will fetch generic list if backend allows).
    // If backend REQUIRES service param, you can early-return here; left active to mimic Query page behavior.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError("");
      const data = await fetchCompServiceRequests({
        service: serviceId || undefined,
        status,
        search: debouncedSearch,
        token,
      });
      setRows(data);
    } catch (e) {
      if (e.name === "AbortError") return;
      setRows([]);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [serviceId, status, debouncedSearch, token]);

  // Initial + filter changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refetch once token becomes available
  useEffect(() => {
    if (token) loadData();
  }, [token, loadData]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, serviceId]);

  function startEdit(row) {
    setEditingRow(row);
    setDialogOpen(true);
  }
  function closeDialog() {
    setDialogOpen(false);
    setEditingRow(null);
  }
  async function saveDialog(updated) {
    if (editingRow && updated.status !== editingRow.status) {
      await handleStatusPersist(editingRow.id, updated.status);
    }
    setRows(r =>
      r.map(row => (row.id === editingRow.id ? { ...row, ...updated } : row))
    );
    closeDialog();
  }

  async function handleStatusPersist(id, newStatus) {
    const prev = rows;
    setRows(r => r.map(row => (row.id === id ? { ...row, status: newStatus } : row)));
    try {
      await updateCompServiceRequestStatus(id, newStatus, token);
    } catch (e) {
      setRows(prev);
      alert(`Failed to update status: ${e.message}`);
    }
  }

  function updateStatus(id, newStatus) {
    handleStatusPersist(id, newStatus);
  }

  async function deleteReq(id) {
    if (!window.confirm("Delete this request?")) return;
    const prev = rows;
    setRows(r => r.filter(row => row.id !== id));
    try {
      await deleteCompServiceRequest(id, token);
    } catch (e) {
      setRows(prev);
      alert(`Delete failed: ${e.message}`);
    }
  }

  const filtered = rows;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold flex items-center gap-3">
        Complimentary Service Requests
      </h2>

      <div className="flex flex-wrap gap-3 items-end">
        <Filter label="Search">
          <input
            className="border px-3 py-2 rounded text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Name / email / mobile"
          />
        </Filter>
        <Filter label="Status">
          <select
            className="border px-3 py-2 rounded text-sm"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="">All</option>
            {STATUSES.map(s => (
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
            onChange={e => setServiceId(e.target.value.trim())}
            placeholder="service id"
          />
        </Filter>
        <button
          type="button"
          onClick={loadData}
          className="px-4 py-2 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Reload"}
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
              <Th>Mobile</Th>
              <Th>Address</Th>
              <Th>Notes</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && paginated.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No requests
                </td>
              </tr>
            )}
            {!loading &&
              paginated.map(r => (
                <tr
                  key={r.id}
                  className="border-t last:border-b hover:bg-gray-50"
                >
                  <Td>{r.name}</Td>
                  <Td>{r.email}</Td>
                  <Td>{r.mobile}</Td>
                  <Td>{r.address}</Td>
                  <Td className="max-w-[180px]" title={r.notes}>
                    <span className="truncate inline-block max-w-[170px]">
                      {r.notes}
                    </span>
                  </Td>
                  <Td>
                    <select
                      className="border px-2 py-1 rounded text-xs"
                      value={r.status}
                      onChange={e => updateStatus(r.id, e.target.value)}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Td>
                  <Td>{formatDate(r.createdAt)}</Td>
                  <Td className="space-x-2">
                    <button
                      className="text-blue-600 text-xs hover:underline"
                      onClick={() => startEdit(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 text-xs hover:underline"
                      onClick={() => deleteReq(r.id)}
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
          disabled={page <= 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <EditRequestDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSave={saveDialog}
        initial={
          editingRow || {
            name: "",
            email: "",
            mobile: "",
            address: "",
            notes: "",
            status: "pending",
          }
        }
        statuses={STATUSES}
        staticMode={false}
      />
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