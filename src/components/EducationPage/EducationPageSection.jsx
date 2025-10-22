import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Read your actual env variable names (URL vs BASE) + optional override endpoints
const API_BASE = import.meta.env.VITE_API_URL;
("");
const EDU_FETCH_ENDPOINT = "/education";
const EDU_UPDATE_ENDPOINT = "/education";

// TEMP fallback (remove when envs confirmed)
const fb = (v, d) => (v ? v : d);
const baseUrl = fb(API_BASE, "");

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
  // Prefer Redux state; fallback to localStorage for hard refresh.
  const reduxToken = useSelector((s) => s.auth?.accessToken);

  const [data, setData] = useState(initialData);
  const [original, setOriginal] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dirty = JSON.stringify(data) !== JSON.stringify(original);
  const fetchedRef = useRef(false);

  const missingEnv = useMemo(() => {
    const list = [];
    if (!API_BASE) list.push("REACT_APP_API_URL");
    return list;
  }, []); // was [API_BASE]

  // Memoize axios instance (baseUrl is a build‑time constant, so exclude it from deps)
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: { "Content-Type": "application/json" },
    });
    instance.interceptors.request.use((config) => {
      const tk =
        reduxToken ||
        (typeof window !== "undefined" && localStorage.getItem("admin_access"));
      if (tk) {
        config.headers.Authorization = `Bearer ${tk}`;
      }
      return config;
    });
    return instance;
  }, [reduxToken]); // baseUrl is constant; safe to exclude

  const mapInbound = (p) => ({
    title: p.title || "",
    heading: p.heading || "",
    onlineCourseNames: p.onlineCourseNames?.length ? p.onlineCourseNames : [""],
    partnershipTitle: p.partnershipTitle || "",
    description: p.description || "",
    services: p.services?.length ? p.services : [""],
    mobile: p.mobile || "",
    email: p.email || "",
  });

  // fetchData now safely depends on missingEnv
  const fetchData = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    setLoading(true);
    setError("");
    setSuccess("");

    if (missingEnv.length) {
      setError("Missing env vars: " + missingEnv.join(", "));
    }

    const fullUrl = `${baseUrl}${EDU_FETCH_ENDPOINT}`;
    console.log("[Education] Fetching:", fullUrl);

    try {
      const res = await api.get(EDU_FETCH_ENDPOINT);
      if (!res?.data?.data) throw new Error("Malformed response");
      const mapped = mapInbound(res.data.data);
      setData(mapped);
      setOriginal(mapped);
    } catch (e) {
      if (e?.response?.status === 401) {
        setError(
          "Unauthorized (401) – access token missing or expired. Please sign in again."
        );
      } else if (e?.response?.status === 404) {
        setError(
          `404 Not Found for "${EDU_FETCH_ENDPOINT}". Confirm actual route. Try variants like:
 - /educations
 - /education-page
 - /education/content
Set REACT_APP_EDU_FETCH_ENDPOINT accordingly.`
        );
      } else {
        setError(
          e?.response?.data?.message ||
            e.message ||
            "Failed to load education data"
        );
      }
      fetchedRef.current = false; // allow retry
    } finally {
      setLoading(false);
    }
  }, [api, missingEnv]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateField = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const updateArrayField = (k, i, v) =>
    setData((d) => {
      const arr = [...d[k]];
      arr[i] = v;
      return { ...d, [k]: arr };
    });
  const addArrayItem = (k) => setData((d) => ({ ...d, [k]: [...d[k], ""] }));
  const removeArrayItem = (k, i) =>
    setData((d) => {
      const arr = d[k].filter((_, idx) => idx !== i);
      return { ...d, [k]: arr.length ? arr : [""] };
    });

  const validate = () => {
    if (!data.title.trim()) return "Title required";
    if (!data.heading.trim()) return "Heading required";
    if (!data.partnershipTitle.trim()) return "Partnership title required";
    if (!data.description.trim()) return "Description required";
    if (!data.email.trim()) return "Email required";
    return "";
  };

  async function handleSave(e) {
    e.preventDefault();
    setSuccess("");
    const v = validate();
    if (v) return setError(v);

    setError("");
    setSaving(true);
    try {
      const payload = {
        title: data.title.trim(),
        heading: data.heading.trim(),
        onlineCourseNames: data.onlineCourseNames
          .map((c) => c.trim())
          .filter(Boolean),
        partnershipTitle: data.partnershipTitle.trim(),
        description: data.description.trim(),
        services: data.services.map((s) => s.trim()).filter(Boolean),
        mobile: data.mobile.trim(),
        email: data.email.trim(),
      };
      console.log(
        "[Education] PUT:",
        `${baseUrl}${EDU_UPDATE_ENDPOINT}`,
        payload
      );
      const res = await api.put(EDU_UPDATE_ENDPOINT, payload);
      if (res?.data?.success) {
        setOriginal(payload);
        setSuccess(res.data.message || "Updated successfully");
      } else throw new Error(res?.data?.message || "Update failed");
    } catch (e2) {
      if (e2?.response?.status === 401) {
        setError(
          "Unauthorized (401) – token missing/expired. Re‑login and retry."
        );
      } else if (e2?.response?.status === 404) {
        setError(
          `Update endpoint "${EDU_UPDATE_ENDPOINT}" 404. Set REACT_APP_EDU_UPDATE_ENDPOINT to correct path.`
        );
      } else {
        setError(
          e2?.response?.data?.message || e2.message || "Failed to save changes"
        );
      }
    } finally {
      setSaving(false);
    }
  }

  const handleReset = () => {
    setData({ ...original });
    setError("");
    setSuccess("");
  };

  if (loading)
    return <div className="p-4 border rounded bg-white text-sm">Loading…</div>;

  return (
    <form
      onSubmit={handleSave}
      className="p-4 border rounded bg-white shadow-sm flex flex-col gap-5"
    >
      <div className="flex items-start justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold">Education Page Content</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              fetchedRef.current = false;
              fetchData();
            }}
            className="px-3 py-2 border rounded text-xs"
            disabled={saving}
          >
            Reload
          </button>
          <button
            type="button"
            disabled={!dirty || saving}
            onClick={handleReset}
            className="px-3 py-2 border rounded text-xs disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!dirty || saving}
            className={`px-4 py-2 rounded text-xs font-medium text-white ${
              !dirty || saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 border border-red-300 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm text-green-600 border border-green-300 bg-green-50 p-2 rounded">
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
    </form>
  );
}

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
        placeholder={label}
      />
    </label>
  );
}

function ArrayField({ label, values, onChange, onAdd, onRemove }) {
  const singular = label.endsWith("s") ? label.slice(0, -1) : label;
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
              placeholder={`${singular} #${i + 1}`}
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              disabled={values.length === 1}
              className="px-3 py-2 border rounded text-sm hover:bg-red-50 disabled:opacity-50"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="self-start px-3 py-1.5 mt-1 border rounded text-xs hover:bg-gray-50"
      >
        + Add {singular}
      </button>
    </div>
  );
}
