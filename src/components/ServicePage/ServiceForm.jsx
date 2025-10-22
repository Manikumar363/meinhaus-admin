import React, { useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import "quill-emoji/dist/quill-emoji.css";
import { createService, updateService, uploadServiceFile } from "../../stores/api/service/mutations";
import { getServiceById } from "../../stores/api/service/queries";
import { extractErr } from "../../stores/api/service/client";

// Quill plugins
import ImageResize from "quill-image-resize-module-react";
import ImageUploader from "quill-image-uploader";
import * as Emoji from "quill-emoji";
import katex from "katex";

// Make KaTeX available for Quill's formula module
if (typeof window !== "undefined") window.katex = katex;

// --- Safe, one-time registration ---
if (typeof window !== "undefined" && !window.__quillPluginsRegistered) {
  try {
    if (ImageResize) Quill.register("modules/imageResize", ImageResize);
    if (ImageUploader) Quill.register("modules/imageUploader", ImageUploader);

    const { EmojiBlot, ToolbarEmoji, TextAreaEmoji, ShortNameEmoji } = Emoji || {};
    if (EmojiBlot) Quill.register("formats/emoji", EmojiBlot, true);
    if (ToolbarEmoji) Quill.register("modules/emoji-toolbar", ToolbarEmoji, true);
    if (TextAreaEmoji) Quill.register("modules/emoji-textarea", TextAreaEmoji, true);
    if (ShortNameEmoji) Quill.register("modules/emoji-shortname", ShortNameEmoji, true);

    const Size = Quill.import("formats/size");
    if (Size && "whitelist" in Size) {
      Size.whitelist = ["small", false, "large", "huge"];
      Quill.register(Size, true);
    }
    window.__quillPluginsRegistered = true;
  } catch (e) {
    // console.warn("Quill plugin registration failed:", e);
  }
}

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

export default function ServiceForm({ id, onCancel, onSaved }) {
  const [form, setForm] = useState(emptyService);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState({ imagePath: false, iconPath: false });

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!id) return;
      try {
        const svc = await getServiceById(id);
        if (mounted && svc) setForm({ ...svc });
      } catch (e) {
        setErr(extractErr(e, "Failed to load service"));
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  const onChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");
    if (!form.name?.trim()) return setErr("Name is required");
    if (!form.slug?.trim()) return setErr("Slug is required");
    setSaving(true);
    try {
      if (id) {
        await updateService(id, form);
        setMsg("Service updated");
      } else {
        await createService(form);
        setMsg("Service created");
        setForm(emptyService);
      }
      onSaved?.();
    } catch (e) {
      setErr(extractErr(e, id ? "Failed to update service" : "Failed to create service"));
    } finally {
      setSaving(false);
    }
  };

  const onFilePick = (field) => async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type?.startsWith("image/")) {
      setErr("Please select an image file");
      return;
    }
    setErr(""); setMsg("");
    setUploading((u) => ({ ...u, [field]: true }));
    try {
      const url = await uploadServiceFile(file, "services", "false");
      if (!url) throw new Error("Upload response missing URL");
      setForm((f) => ({ ...f, [field]: url }));
      setMsg("File uploaded");
    } catch (er) {
      setErr(extractErr(er, "Upload failed"));
    } finally {
      setUploading((u) => ({ ...u, [field]: false }));
    }
  };

  const clearMedia = (field) => setForm((f) => ({ ...f, [field]: "" }));

  // Quill toolbar/modules with image upload, resize, emoji, formula
  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image", "video", "formula", "emoji"],
        ["clean"],
      ],
    },
    imageResize: { parchment: Quill.import("parchment") },
    imageUploader: {
      upload: async (file) => {
        const url = await uploadServiceFile(file, "services", "false");
        return url; // ReactQuill will insert <img src={url} />
      },
    },
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
    keyboard: { bindings: {} },
  }), []);

  const quillFormats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "align",
    "color",
    "background",
    "script",
    "link",
    "image",
    "video",
    "formula",
    "emoji",
  ];

  return (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col min-h-0 overflow-hidden">
      <button
        type="button"
        onClick={onCancel}
        className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center gap-2"
      >
        <span className="text-xl">&larr;</span> Back
      </button>

      <h2 className="text-2xl font-semibold mb-6">{id ? "Edit Service" : "Add New Service"}</h2>

      {err && <div className="mb-4 px-4 py-3 rounded-md bg-red-50 text-red-700 text-sm">{err}</div>}
      {msg && <div className="mb-4 px-4 py-3 rounded-md bg-green-50 text-green-700 text-sm">{msg}</div>}

      <form onSubmit={onSubmit} className="space-y-6 flex-1 overflow-auto">
        {/* Basic Service Information */}
        <section className="bg-white border rounded-lg p-5">
          <h3 className="font-medium mb-4">Basic Service Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input label="Service Name" required value={form.name} onChange={(v) => onChange("name", v)} />
            <Input label="Slug" required value={form.slug} onChange={(v) => onChange("slug", v)} />
            <NumberInput label="Minimum Hour(s)" value={form.minHoursRequired} onChange={(v) => onChange("minHoursRequired", v)} />
            <NumberInput label="Price (in $)" value={form.price} onChange={(v) => onChange("price", v)} />
            <NumberInput label="Additional Price/Hour (in $)" value={form.additionalHourPrice} onChange={(v) => onChange("additionalHourPrice", v)} />
            <Select
              label="Status"
              value={form.status}
              options={[
                { value: "", label: "Select Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "In-active" },
              ]}
              onChange={(v) => onChange("status", v)}
            />
          </div>
          <label className="flex items-center gap-2 mt-3 text-sm">
            <input
              type="checkbox"
              checked={form.is_license_required}
              onChange={(e) => onChange("is_license_required", e.target.checked)}
            />
            License Required
          </label>
        </section>

        {/* Service Content */}
        <section className="bg-white border rounded-lg p-5">
          <h3 className="font-medium mb-4">Service Content</h3>
          <Input label="Introduction Title" value={form.introTitle} onChange={(v) => onChange("introTitle", v)} />
          <div className="mt-4">
            <Label>Introduction</Label>
            <ReactQuill theme="snow" value={form.introduction} onChange={(v) => onChange("introduction", v)} modules={quillModules} formats={quillFormats} />
          </div>
          <div className="mt-4">
            <Label>Why Choose Us</Label>
            <ReactQuill theme="snow" value={form.whyChooseUs} onChange={(v) => onChange("whyChooseUs", v)} modules={quillModules} formats={quillFormats} />
          </div>
          <div className="mt-4">
            <Label>Full Description</Label>
            <ReactQuill theme="snow" value={form.description} onChange={(v) => onChange("description", v)} modules={quillModules} formats={quillFormats} />
          </div>
        </section>

        {/* SEO Information */}
        <section className="bg-white border rounded-lg p-5">
          <h3 className="font-medium mb-4">SEO Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input label="Meta Title" value={form.metaTitle} onChange={(v) => onChange("metaTitle", v)} />
            <Input label="Meta Description" value={form.metaDescription} onChange={(v) => onChange("metaDescription", v)} />
          </div>
        </section>

        {/* Media Files */}
        <section className="bg-white border rounded-lg p-5">
          <h3 className="font-medium mb-4">Media Files (one icon & one image)</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Image */}
            <div>
              <Label>Service Image</Label>
              {form.imagePath ? (
                <img src={form.imagePath} alt="service" className="w-20 h-20 object-cover rounded mb-2" />
              ) : (
                <div className="w-20 h-20 bg-gray-100 border rounded mb-2" />
              )}
              <div className="flex items-center gap-2">
                <input id="service-image" type="file" accept="image/*" className="hidden" onChange={onFilePick("imagePath")} />
                <label htmlFor="service-image" className="px-3 py-2 border rounded text-sm cursor-pointer hover:bg-gray-50">
                  {uploading.imagePath ? "Uploading..." : "Upload Image"}
                </label>
                {form.imagePath && (
                  <button type="button" onClick={() => clearMedia("imagePath")} className="text-sm text-red-600 hover:underline">
                    Remove
                  </button>
                )}
              </div>
              <input
                type="url"
                placeholder="Or paste image URL"
                className="mt-2 border rounded px-3 py-2 text-sm w-full"
                value={form.imagePath}
                onChange={(e) => onChange("imagePath", e.target.value)}
              />
            </div>

            {/* Service Icon */}
            <div>
              <Label>Service Icon</Label>
              {form.iconPath ? (
                <img src={form.iconPath} alt="icon" className="w-12 h-12 object-cover rounded mb-2" />
              ) : (
                <div className="w-12 h-12 bg-gray-100 border rounded mb-2" />
              )}
              <div className="flex items-center gap-2">
                <input id="service-icon" type="file" accept="image/*" className="hidden" onChange={onFilePick("iconPath")} />
                <label htmlFor="service-icon" className="px-3 py-2 border rounded text-sm cursor-pointer hover:bg-gray-50">
                  {uploading.iconPath ? "Uploading..." : "Upload Icon"}
                </label>
                {form.iconPath && (
                  <button type="button" onClick={() => clearMedia("iconPath")} className="text-sm text-red-600 hover:underline">
                    Remove
                  </button>
                )}
              </div>
              <input
                type="url"
                placeholder="Or paste icon URL"
                className="mt-2 border rounded px-3 py-2 text-sm w-full"
                value={form.iconPath}
                onChange={(e) => onChange("iconPath", e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3 pb-2">
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm disabled:opacity-60">
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={onCancel} className="px-5 py-2 rounded-md border text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const Label = ({ children }) => <div className="text-sm font-medium mb-2">{children}</div>;

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

const Select = ({ label, value, onChange, options }) => (
  <label className="block text-sm">
    <span className="font-medium">{label}</span>
    <select
      className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </label>
);