import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

// Adjust if you already have a configured axios instance.
// Optionally move to a constants file.
const EDUCATION_ENDPOINT = "/education"; // GET + PUT

const initialData = {
  title: "",
  heading: "",
  onlineCourseNames: [""],
  partnershipTitle: "",
  description: "",
  services: [""],
  mobile: "",
  email: "",
};

export default function EducationPageSection() {
  const [data, setData] = useState(initialData);
  const [original, setOriginal] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dirty = JSON.stringify(data) !== JSON.stringify(original);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(EDUCATION_ENDPOINT);
      const payload = res.data || {};
      // Ensure array fields exist
      setData({
        title: payload.title || "",
        heading: payload.heading || "",
        onlineCourseNames:
          Array.isArray(payload.onlineCourseNames) && payload.onlineCourseNames.length
            ? payload.onlineCourseNames
            : [""],
        partnershipTitle: payload.partnershipTitle || "",
        description: payload.description || "",
        services:
          Array.isArray(payload.services) && payload.services.length
            ? payload.services
            : [""],
        mobile: payload.mobile || "",
        email: payload.email || "",
      });
      setOriginal(payload);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load education data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function updateField(field, value) {
    setData((d) => ({ ...d, [field]: value }));
  }

  function updateArrayField(field, index, value) {
    setData((d) => {
      const arr = [...d[field]];
      arr[index] = value;
      return { ...d, [field]: arr };
    });
  }

  function addArrayItem(field) {
    setData((d) => ({ ...d, [field]: [...d[field], ""] }));
  }

  function removeArrayItem(field, index) {
    setData((d) => {
      const arr = d[field].filter((_, i) => i !== index);
      return { ...d, [field]: arr.length ? arr : [""] };
    });
  }

  function validate() {
    if (!data.title.trim()) return "Title required";
    if (!data.heading.trim()) return "Heading required";
    if (!data.partnershipTitle.trim()) return "Partnership title required";
    if (!data.description.trim()) return "Description required";
    if (!data.email.trim()) return "Email required";
    return "";
  }

  async function handleSave(e) {
    e.preventDefault();
    setSuccess("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...data,
        onlineCourseNames: data.onlineCourseNames.filter((c) => c.trim()),
        services: data.services.filter((s) => s.trim()),
      };
      await axios.put(EDUCATION_ENDPOINT, payload);
      setOriginal(payload);
      setSuccess("Saved");
    } catch (e2) {
      setError(e2?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setData({
      title: original.title || "",
      heading: original.heading || "",
      onlineCourseNames: original.onlineCourseNames?.length
        ? original.onlineCourseNames
        : [""],
      partnershipTitle: original.partnershipTitle || "",
      description: original.description || "",
      services: original.services?.length ? original.services : [""],
      mobile: original.mobile || "",
      email: original.email || "",
    });
    setError("");
    setSuccess("");
  }

  if (loading) {
    return (
      <div className="p-4 border rounded bg-white shadow-sm text-sm">
        Loading education data...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSave}
      className="p-4 border rounded bg-white shadow-sm flex flex-col gap-5"
    >
      <h2 className="text-xl font-semibold">Education Page Content</h2>

      {error && (
        <div className="text-sm text-red-600 border border-red-300 rounded p-2 bg-red-50">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm text-green-600 border border-green-300 rounded p-2 bg-green-50">
          {success}
        </div>
      )}

      <Field
        label="Title"
        value={data.title}
        onChange={(v) => updateField("title", v)}
      />
      <Field
        label="Heading"
        as="textarea"
        value={data.heading}
        onChange={(v) => updateField("heading", v)}
      />
      <ArrayField
        label="Online Course Names"
        values={data.onlineCourseNames}
        onChange={(i, v) => updateArrayField("onlineCourseNames", i, v)}
        onAdd={() => addArrayItem("onlineCourseNames")}
        onRemove={(i) => removeArrayItem("onlineCourseNames", i)}
      />
      <Field
        label="Partnership Title"
        value={data.partnershipTitle}
        onChange={(v) => updateField("partnershipTitle", v)}
      />
      <Field
        label="Description"
        as="textarea"
        value={data.description}
        onChange={(v) => updateField("description", v)}
      />
      <ArrayField
        label="Services"
        values={data.services}
        onChange={(i, v) => updateArrayField("services", i, v)}
        onAdd={() => addArrayItem("services")}
        onRemove={(i) => removeArrayItem("services", i)}
      />
      <Field
        label="Mobile"
        value={data.mobile}
        onChange={(v) => updateField("mobile", v)}
      />
      <Field
        label="Email"
        value={data.email}
        onChange={(v) => updateField("email", v)}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={!dirty || saving}
          className={`px-4 py-2 rounded text-white text-sm ${
            !dirty || saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          disabled={!dirty || saving}
          onClick={handleReset}
          className="px-4 py-2 rounded border text-sm disabled:opacity-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={fetchData}
          disabled={saving}
          className="ml-auto px-4 py-2 rounded border text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Reload
        </button>
      </div>
    </form>
  );
}

// Simple input/textarea component
function Field({ label, value, onChange, as = "input" }) {
  const Comp = as;
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium">{label}</span>
      <Comp
        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        rows={as === "textarea" ? 4 : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

// Dynamic list for courses/services
function ArrayField({ label, values, onChange, onAdd, onRemove }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-sm">{label}</span>
      <div className="flex flex-col gap-2">
        {values.map((val, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={val}
              onChange={(e) => onChange(i, e.target.value)}
              placeholder={`${label} #${i + 1}`}
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              disabled={values.length === 1}
              className="px-3 py-2 border rounded text-sm hover:bg-red-50 disabled:opacity-50"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="self-start px-3 py-1.5 mt-1 rounded border text-xs hover:bg-gray-50"
      >
        + Add {label.slice(0, -1)}
      </button>
    </div>
  );
}