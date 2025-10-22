import React, { useEffect } from "react";

export default function EditRequestDialog({
  open,
  onClose,
  onSave,
  initial,
  statuses,
  staticMode,
}) {
  const [form, setForm] = React.useState(initial);
  const [saving, setSaving] = React.useState(false);

  // Sync when a new row is chosen
  useEffect(() => {
    if (open) setForm(initial);
  }, [initial, open]);

  // Close on ESC
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function update(k, v) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try { await onSave(form); }
    finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold">Edit Request</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-sm px-2 py-1"
              aria-label="Close dialog"
            >✕</button>
          </div>

          <p className="text-[11px] text-amber-600">
            Only Status is persisted to server. Other fields are read-only.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input disabled value={form.name || ""} className="border rounded px-2 py-1 text-sm w-full" />
            </Field>
            <Field label="Email">
              <input disabled value={form.email || ""} className="border rounded px-2 py-1 text-sm w-full" />
            </Field>
            <Field label="Mobile">
              <input disabled value={form.mobile || ""} className="border rounded px-2 py-1 text-sm w-full" />
            </Field>
            <Field label="Status">
              <select
                value={form.status || ""}
                onChange={e => update("status", e.target.value)}
                className="border rounded px-2 py-1 text-sm w-full"
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <input disabled value={form.address || ""} className="border rounded px-2 py-1 text-sm w-full" />
            </Field>
            <Field label="Notes" className="sm:col-span-2">
              <textarea disabled rows={3} value={form.notes || ""} className="border rounded px-2 py-1 text-sm w-full" />
            </Field>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-medium tracking-wide uppercase text-gray-600">{label}</span>
      {children}
    </label>
  );
}