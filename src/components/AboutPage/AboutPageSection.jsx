// About (Static Pages) list + inline edit (no routing)
import { useEffect, useState } from "react";
import { CustomButton, UpdateButton } from "../common/Inputs";
import { LoadingSpinner } from "../common/LoadingSpinner";
import EditStaticPage from "./EditStaticPage";
import { filterHtmlTags } from "../../lib/reusable-funs";

const LS_KEY = "static_pages_mock";

const SEED = [
  { _id: "1", title: "Privacy Policy", description: "<p>Privacy content...</p>", status: "Active" },
  { _id: "2", title: "Terms & Conditions", description: "<p>Terms content...</p>", status: "Inactive" },
  { _id: "3", title: "About Section", description: "<P>About Content...</P>" , status: "Active"},
];

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeStore(pages) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(pages));
  } catch {}
}

const AboutPageSection = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // seed + load
  useEffect(() => {
    const existing = readStore();
    if (!existing.length) {
      writeStore(SEED);
      setPages(SEED);
      setLoading(false);
      return;
    }
    // Merge any new seed items not yet stored
    const missing = SEED.filter(s => !existing.some(e => e._id === s._id));
    if (missing.length) {
      const merged = [...existing, ...missing];
      writeStore(merged);
      setPages(merged);
    } else {
      setPages(existing);
    }
    setLoading(false);
  }, []);

  const toggleStatus = (id) => {
    setPages((prev) => {
      const next = prev.map((p) =>
        p._id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p
      );
      writeStore(next);
      return next;
    });
  };

  const handleSave = (updated) => {
    setPages((prev) => {
      const next = prev.map((p) => (p._id === updated._id ? updated : p));
      writeStore(next);
      return next;
    });
    setEditingId(null);
  };

  if (editingId) {
    const page = pages.find((p) => p._id === editingId);
    return (
      <EditStaticPage
        page={page}
        onCancel={() => setEditingId(null)}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="main-container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Static Pages</h2>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setPages(readStore());
              setLoading(false);
            }, 120);
          }}
          className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="py-8">
                  <div className="flex justify-center">
                    <LoadingSpinner size={40} />
                  </div>
                </td>
              </tr>
            )}
            {!loading && !pages.length && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No pages found.
                </td>
              </tr>
            )}
            {!loading &&
              pages.map((p) => {
                const desc = filterHtmlTags(p.description || "");
                return (
                  <tr key={p._id} className="border-t">
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">
                      {desc.length > 80 ? desc.slice(0, 80) + "…" : desc}
                    </td>
                    <td className="px-4 py-2">
                      <CustomButton
                        className={`${
                          p.status === "Inactive" ? "red-button" : "green-button"
                        } w-[5rem]`}
                        handleClick={() => toggleStatus(p._id)}
                      >
                        {p.status}
                      </CustomButton>
                    </td>
                    <td className="px-4 py-2">
                      <UpdateButton handleClick={() => setEditingId(p._id)} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutPageSection;