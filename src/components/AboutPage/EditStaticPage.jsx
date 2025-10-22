// Inline edit component (Tiptap version)
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const EditStaticPage = ({ page, creating, onCancel, onSave, saving }) => {
  const [title, setTitle] = useState(page?.title || "");
  const [status, setStatus] = useState(page?.status || "active");
  const [content, setContent] = useState(page?.content || "");

  const isNew = !page?.id;
  const disabledTitle = !isNew; // title immutable after create
  const valid = title.trim() && content.trim();

  // Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  return (
    <div className="main-container bg-white p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-6">
        {creating ? "Create Page" : "Edit Page"}
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="w-full border rounded px-3 py-2 text-sm disabled:bg-gray-100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabledTitle}
          placeholder="Page title"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">Content</label>
        <div className="border rounded min-h-[260px] p-2">
          {editor ? (
            <EditorContent editor={editor} />
          ) : (
            <div className="text-sm text-gray-500">Loading editor…</div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() =>
            onSave({
              ...page,
              id: page?.id || null,
              title: title.trim(),
              content,
              status,
            })
          }
          disabled={!valid || saving}
          className={`px-4 py-2 rounded text-white text-sm ${
            !valid || saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded border text-sm hover:bg-gray-50"
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditStaticPage;
