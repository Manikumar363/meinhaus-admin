import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Eye, MoreVertical } from "lucide-react";
import { getServices } from "../../stores/api/service/queries";
import { updateServiceStatus, deleteService } from "../../stores/api/service/mutations";
import { extractErr } from "../../stores/api/service/client";

const pageSize = 10;

export default function ServiceList({ onAdd, onEdit }) {
  const [status] = useState("active");
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(""); setMsg("");
    try {
      const data = await getServices(status);
      setServices(data);
    } catch (e) {
      setErr(extractErr(e, "Failed to load services"));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { load(); }, [load]); // initial load

  // Close menu on outside click or Escape
  useEffect(() => {
    if (!openMenuId) return;
    const onDocClick = (e) => {
      const el = document.querySelector(`[data-menu="service-${openMenuId}"]`);
      if (el && el.contains(e.target)) return;
      setOpenMenuId(null);
    };
    const onEsc = (e) => e.key === "Escape" && setOpenMenuId(null);
    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, [openMenuId]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) => s.name?.toLowerCase().includes(q) || s.slug?.toLowerCase().includes(q)
    );
  }, [services, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const pageSlice = filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize);

  const onToggle = async (id, checked) => {
    setErr(""); setMsg("");
    try {
      await updateServiceStatus(id, checked ? "active" : "inactive");
      setMsg("Status updated");
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: checked ? "active" : "inactive" } : s))
      );
    } catch (e) {
      setErr(extractErr(e, "Failed to update status"));
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this service? This action cannot be undone.")) return;
    setErr(""); setMsg("");
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setMsg("Service deleted");
    } catch (e) {
      setErr(extractErr(e, "Failed to delete service"));
    } finally {
      setOpenMenuId(null);
    }
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Services</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search services"
              className="w-64 border rounded-md pl-9 pr-3 py-2 text-sm"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-3.5-3.5" />
            </svg>
          </div>
          <button
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
          >
            + Add Services
          </button>
        </div>
      </div>

      {err && <div className="mb-4 px-4 py-3 rounded-md bg-red-50 text-red-700 text-sm">{err}</div>}
      {msg && <div className="mb-4 px-4 py-3 rounded-md bg-green-50 text-green-700 text-sm">{msg}</div>}

      <div className="flex-1 flex flex-col min-h-0">
        <div className="border rounded-lg bg-white flex-1 overflow-auto">
          <div className="min-w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-3 text-left w-16">S.No.</th>
                  <th className="px-3 py-3 text-left w-20">Image</th>
                  <th className="px-3 py-3 text-left">Service Name</th>
                  <th className="px-3 py-3 text-left">Slug</th>
                  <th className="px-3 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={5} className="px-3 py-6 text-center text-gray-500">Loading...</td></tr>
                )}
                {!loading && pageSlice.length === 0 && (
                  <tr><td colSpan={5} className="px-3 py-6 text-center text-gray-500">No services found.</td></tr>
                )}
                {pageSlice.map((svc, idx) => (
                  <tr key={svc.id} className="border-t">
                    <td className="px-3 py-3">{(pageSafe - 1) * pageSize + idx + 1}</td>
                    <td className="px-3 py-3">
                      {svc.imagePath
                        ? <img src={svc.imagePath} alt={svc.name} className="w-10 h-10 rounded object-cover"
                               onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
                        : <div className="w-10 h-10 rounded bg-gray-200" />}
                    </td>
                    <td className="px-3 py-3">{svc.name}</td>
                    <td className="px-3 py-3">{svc.slug}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-3">
                        {/* Status toggle */}
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={svc.status === "active"}
                            onChange={(e) => onToggle(svc.id, e.target.checked)}
                          />
                          <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition relative">
                            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
                          </div>
                        </label>

                        {/* Optional "View" */}
                        <button
                          type="button"
                          title="View"
                          className="text-yellow-500 hover:text-yellow-600"
                          onClick={() => onEdit(svc.id)}
                        >
                          <Eye className="w-5 h-5" />
                        </button>

                        {/* Three dots menu */}
                        <div className="relative" data-menu={`service-${svc.id}`}>
                          <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={openMenuId === svc.id}
                            className="text-gray-600 hover:text-gray-800 p-1 rounded"
                            onClick={() =>
                              setOpenMenuId((cur) => (cur === svc.id ? null : svc.id))
                            }
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          {openMenuId === svc.id && (
                            <div
                              role="menu"
                              className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2"
                            >
                              <button
                                role="menuitem"
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => { setOpenMenuId(null); onEdit(svc.id); }}
                              >
                                {/* simple edit icon */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                </svg>
                                Edit
                              </button>
                              <div className="my-1 h-px bg-gray-100" />
                              <button
                                role="menuitem"
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                onClick={() => onDelete(svc.id)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              className="px-3 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pageSafe === 1}
            >
              Previous
            </button>
            <div className="text-sm">Page {pageSafe} of {totalPages}</div>
            <button
              className="px-3 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageSafe === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}