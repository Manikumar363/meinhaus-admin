"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

// ---- Config / helpers -------------------------------------------------
const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");
const ENDPOINT = "/services";
const withBase = (p = "") =>
  `${API_BASE}${p.startsWith("/") ? p : `/${p}`}`;

// Read token (adjust key if your auth slice uses a different storage key)
const getToken = () =>
  localStorage.getItem("admin_access") ||
  localStorage.getItem("accessToken") ||
  "";

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

api.interceptors.request.use((cfg) => {
  const tk = getToken();
  if (tk) cfg.headers.Authorization = `Bearer ${tk}`;
  return cfg;
});

// ---- Initial form state ------------------------------------------------
const emptyService = {
  id: "",
  name: "",
  iconPath: "",
  imagePath: "",
  minHoursRequired: 0,
  price: 0,
  additionalHourPrice: 0,
  introTitle: "",
  introduction: "",
  whyChooseUs: "",
  description: "",
  metaTitle: "",
  metaDescription: "",
  is_license_required: false,
  status: "active",
  slug: "",
};

// ---- Component ---------------------------------------------------------
const ServiceSectionPage = () => {
  const [services, setServices] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState("active");
  const [form, setForm] = useState(emptyService);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ---- Load list ------------------------------------------------------
  const fetchServices = useCallback(async () => {
    setLoadingList(true);
    setError(""); setMessage("");
    try {
      // Although GET with body is unusual, backend spec says body {status:"active"}
      // axios allows data in GET via request config object.
      const res = await api.request({
        method: "GET",
        url: ENDPOINT,
        data: { status: filterStatus },
        // Fallback query param too (in case body ignored)
        params: { status: filterStatus },
      });
      const arr = res?.data?.data?.services || [];
      setServices(arr);
    } catch (e) {
      setError(extractErr(e, "Failed to load services"));
    } finally {
      setLoadingList(false);
    }
  }, [filterStatus]);

  // ---- Load single service -------------------------------------------
  const fetchService = async (id) => {
    setLoadingItem(true);
    setError(""); setMessage("");
    try {
      const res = await api.request({
        method: "GET",
        url: `${ENDPOINT}/${id}`,
        data: { status: filterStatus }, // per spec
      });
      const svc = res?.data?.data?.service?.[0];
      if (svc) {
        setForm({ ...svc });
        setEditingId(svc.id);
      } else {
        setError("Service not found in response");
      }
    } catch (e) {
      setError(extractErr(e, "Failed to load service"));
    } finally {
      setLoadingItem(false);
    }
  };

  // ---- Create ---------------------------------------------------------
  const createService = async () => {
    setSaving(true);
    setError(""); setMessage("");
    try {
      const payload = buildServicePayload(form);
      console.log("[Service][CREATE] payload", payload);
      const res = await api.post(ENDPOINT, payload);
      setMessage(res?.data?.message || "Service created");
      setForm(emptyService);
      setEditingId("");
      fetchServices();
    } catch (e) {
      setError(extractErr(e, "Failed to create service"));
    } finally {
      setSaving(false);
    }
  };

  // ---- Update ---------------------------------------------------------
  const updateService = async () => {
    if (!editingId) return;
    setSaving(true);
    setError(""); setMessage("");
    try {
      const payload = buildServicePayload(form);
      console.log("[Service][UPDATE] id:", editingId, "payload", payload);
      const res = await api.put(`${ENDPOINT}/${editingId}`, payload);
      setMessage(res?.data?.message || "Service updated");
      fetchServices();
    } catch (e) {
      setError(extractErr(e, "Failed to update service"));
    } finally {
      setSaving(false);
    }
  };

  // ---- Update status only --------------------------------------------
  const updateStatus = async (id, newStatus) => {
    setError(""); setMessage("");

    // Try PATCH (minimal)
    try {
      console.log("[Service][STATUS PATCH] id:", id, { status: newStatus });
      const res = await api.patch
        ? await api.patch(`${ENDPOINT}/${id}`, { status: newStatus })
        : await api.request({ method: "PATCH", url: `${ENDPOINT}/${id}`, data: { status: newStatus } });
      setMessage(res?.data?.message || "Status updated");
      setServices(prev =>
        prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
      );
      if (editingId === id) setForm(f => ({ ...f, status: newStatus }));
      return;
    } catch (e) {
      // If 405 or 404 or 500, try full PUT
      console.warn("[Service][STATUS PATCH] failed, trying PUT full payload", e?.response?.status);
    }

    // Fetch existing service (to build minimal spec payload)
    let svc;
    try {
      const res = await api.request({
        method: "GET",
        url: `${ENDPOINT}/${id}`,
        data: { status: filterStatus },
      });
      svc = res?.data?.data?.service?.[0];
    } catch (e) {
      setError(extractErr(e, "Failed to fetch service for status PUT"));
      return;
    }
    if (!svc) {
      setError("Service not found for status update");
      return;
    }
    svc.status = newStatus;
    const payload = buildServicePayload(svc);

    try {
      console.log("[Service][STATUS PUT] id:", id, "payload:", payload);
      const res = await api.put(`${ENDPOINT}/${id}`, payload);
      setMessage(res?.data?.message || "Status updated");
      setServices(prev =>
        prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
      );
      if (editingId === id) setForm(f => ({ ...f, status: newStatus }));
    } catch (e) {
      console.error("[Service][STATUS PUT][ERROR]", e?.response || e);
      if (e?.response?.status === 500) {
        setError(
          "Server 500 still calling toISOString(). Since we removed dates client-side, fix must occur in backend (likely treating a non-date field as Date)."
        );
      } else {
        setError(extractErr(e, "Failed to update status"));
      }
    }
  };

  // ---- Form handlers --------------------------------------------------
  const onChange = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!form.slug.trim()) {
      setError("Slug is required");
      return;
    }
    editingId ? updateService() : createService();
  };

  const startCreate = () => {
    setForm(emptyService);
    setEditingId("");
    setMessage(""); setError("");
  };

  // ---- Effects --------------------------------------------------------
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // ---- Render ---------------------------------------------------------
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="text-sm text-gray-500">
            Create, edit & manage platform services.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="">All</option>
          </select>
          <button
            onClick={startCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
          >
            New Service
          </button>
        </div>
      </header>

      {/* Alerts */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-md bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-4 px-4 py-3 rounded-md bg-green-50 text-green-700 text-sm">
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-10">
        {/* List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium">Service List</h2>
            {loadingList && (
              <span className="text-xs text-gray-500 animate-pulse">
                Loading...
              </span>
            )}
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Slug</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 && !loadingList && (
                  <tr>
                    <td
                      className="px-3 py-6 text-center text-gray-500"
                      colSpan={4}
                    >
                      No services found.
                    </td>
                  </tr>
                )}
                {services.map((svc) => (
                  <tr
                    key={svc.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-3 py-2">{svc.name}</td>
                    <td className="px-3 py-2">{svc.slug}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          svc.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {svc.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right space-x-2">
                      <button
                        onClick={() => fetchService(svc.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(
                            svc.id,
                            svc.status === "active" ? "inactive" : "active"
                          )
                        }
                        className="text-gray-600 hover:underline"
                      >
                        {svc.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form */}
        <div className="border rounded-lg p-5 bg-white shadow-sm self-start">
          <h2 className="font-medium mb-4">
            {editingId ? "Edit Service" : "Create Service"}
          </h2>
          {loadingItem && (
            <p className="text-xs text-gray-500 mb-2">Loading service...</p>
          )}
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Name"
                value={form.name}
                onChange={(v) => onChange("name", v)}
                required
              />
              <Input
                label="Slug"
                value={form.slug}
                onChange={(v) => onChange("slug", v)}
                required
              />
              <Input
                label="Icon URL"
                value={form.iconPath}
                onChange={(v) => onChange("iconPath", v)}
              />
              <Input
                label="Image URL"
                value={form.imagePath}
                onChange={(v) => onChange("imagePath", v)}
              />
              <div className="grid grid-cols-2 gap-3">
                <NumberInput
                  label="Min Hours"
                  value={form.minHoursRequired}
                  onChange={(v) => onChange("minHoursRequired", v)}
                />
                <NumberInput
                  label="Price"
                  value={form.price}
                  onChange={(v) => onChange("price", v)}
                />
                <NumberInput
                  label="Add. Hour Price"
                  value={form.additionalHourPrice}
                  onChange={(v) => onChange("additionalHourPrice", v)}
                />
                <Select
                  label="Status"
                  value={form.status}
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                  onChange={(v) => onChange("status", v)}
                />
              </div>
              <Input
                label="Intro Title"
                value={form.introTitle}
                onChange={(v) => onChange("introTitle", v)}
              />
              <Textarea
                label="Introduction (HTML)"
                value={form.introduction}
                onChange={(v) => onChange("introduction", v)}
              />
              <Textarea
                label="Why Choose Us (HTML)"
                value={form.whyChooseUs}
                onChange={(v) => onChange("whyChooseUs", v)}
              />
              <Textarea
                label="Description"
                value={form.description}
                onChange={(v) => onChange("description", v)}
              />
              <Input
                label="Meta Title"
                value={form.metaTitle}
                onChange={(v) => onChange("metaTitle", v)}
              />
              <Textarea
                label="Meta Description"
                value={form.metaDescription}
                onChange={(v) => onChange("metaDescription", v)}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_license_required}
                  onChange={(e) =>
                    onChange("is_license_required", e.target.checked)
                  }
                />
                License Required
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Service"
                    : "Create Service"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={startCreate}
                    className="px-4 py-2 rounded-md border text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

// ---- Small Reusable Inputs ---------------------------------------------
const Input = ({ label, value, onChange, required }) => (
  <label className="block text-sm">
    <span className="font-medium">{label}{required && " *"}</span>
    <input
      className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const NumberInput = ({ label, value, onChange }) => (
  <label className="block text-sm">
    <span className="font-medium">{label}</span>
    <input
      type="number"
      className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      min={0}
    />
  </label>
);

const Textarea = ({ label, value, onChange }) => (
  <label className="block text-sm">
    <span className="font-medium">{label}</span>
    <textarea
      className="mt-1 w-full border rounded-md px-3 py-2 text-sm h-20 resize-y focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const Select = ({ label, value, onChange, options }) => (
  <label className="block text-sm">
    <span className="font-medium">{label}</span>
    <select
      className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

// ---- Error helper ------------------------------------------------------
function extractErr(e, fallback) {
  if (e?.response?.data?.message) return e.response.data.message;
  if (e?.message) return e.message;
  return fallback;
}

function buildServicePayload(src) {
  return {
    name: src.name ?? "",
    iconPath: src.iconPath ?? "",
    imagePath: src.imagePath ?? "",
    minHoursRequired: Number(src.minHoursRequired) || 0,
    price: Number(src.price) || 0,
    additionalHourPrice: Number(src.additionalHourPrice) || 0,
    introTitle: src.introTitle ?? "",
    introduction: typeof src.introduction === "string" ? src.introduction : "",
    whyChooseUs: typeof src.whyChooseUs === "string" ? src.whyChooseUs : "",
    description: src.description ?? "",
    metaTitle: src.metaTitle ?? "",
    metaDescription: src.metaDescription ?? "",
    is_license_required: !!src.is_license_required,
    status: src.status ?? "active",
    slug: src.slug ?? "",
    // NO createdAt / updatedAt sent
  };
}

export default ServiceSectionPage;