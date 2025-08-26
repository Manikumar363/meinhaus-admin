// Inline edit component (no routing) expects props: page, onSave(updatedPage), onCancel()
import { useEffect, useState, useRef } from "react";
import * as Inputs from "../common/Inputs";
import { LoadingSpinner } from "../common/LoadingSpinner";
import "react-quill/dist/quill.snow.css";

const CustomInput = Inputs.CustomInput;
const CustomSelect = Inputs.CustomSelect;
const CustomButton = Inputs.CustomButton;

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ script: "sub" }, { script: "super" }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};
const quillFormats = [
  "header","font","bold","italic","underline","strike","script",
  "color","background","list","bullet","align","blockquote",
  "code-block","link","image","video"
];

let ReactQuill; // loaded once

const EditStaticPage = ({ page, onCancel, onSave }) => {
  const [title, setTitle] = useState(page?.title || "");
  const [status, setStatus] = useState(page?.status || "Active");
  const [description, setDescription] = useState(page?.description || "");
  const [saving, setSaving] = useState(false);
  const [, force] = useState(0);

  useEffect(() => {
    (async () => {
      if (!ReactQuill) {
        const mod = await import("react-quill");
        ReactQuill = mod.default;
        force((n) => n + 1);
      }
    })();
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave({ ...page, title, status, description });
      setSaving(false);
    }, 150);
  };

  if (!page) return <div className="p-6">Not found</div>;

  return (
    <div className="main-container bg-[#ffff] p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-6">Edit Static Page</h2>

      <div className="input-container mb-5">
        <div className="label mb-1">Title</div>
        <div className="user-input">
          <CustomInput text={title} setText={setTitle} disabled />
        </div>
      </div>

      <div className="input-container mb-5">
        <div className="label mb-1">Description</div>
        <div className="user-input bg-white text-black rounded">
          {ReactQuill ? (
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={quillModules}
              formats={quillFormats}
              className="min-h-[260px]"
            />
          ) : (
            <div className="p-3 text-sm flex items-center gap-2">
              <LoadingSpinner size={20} /> Loading editor...
            </div>
          )}
        </div>
      </div>

      <div className="input-container mb-6">
        <div className="label mb-1">Status</div>
        <div className="user-input">
          <CustomSelect menu={["Active","Inactive"]} value={status} onChange={setStatus} />
        </div>
      </div>

      <div className="flex gap-3">
        <CustomButton className="purple-button" handleClick={handleSave} disabled={saving}>
          {saving ? <LoadingSpinner /> : "Save"}
        </CustomButton>
        <CustomButton className="bg-gray-500 hover:bg-gray-600 text-white" handleClick={onCancel}>
          Cancel
        </CustomButton>
      </div>
    </div>
  );
};

export default EditStaticPage;