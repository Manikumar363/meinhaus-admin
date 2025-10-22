import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../lib/utils/uploadFile'; // adjust relative path if needed

// Base API (normalized)
const API_ROOT = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
// Endpoints:
// GET    /carousal/home
// POST   /carousal/home          { imagePath, title }
// PUT    /carousal/home/:id      { imagePath, title }
// DELETE /carousal/home/:id
//
// NOTE: API returns imagePath (may be relative). Adjust buildImageUrl() if needed.
const buildImageUrl = (p) => {
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;
  // If backend serves absolute S3 URLs already, remove this line.
  return `https://dev-carenest.s3.ap-south-1.amazonaws.com${p}`;
};

const emptyItem = () => ({
  id: null,
  title: '',
  imagePath: ''
});

const SliderSection = () => {
  const token = useSelector(s => s.auth.accessToken);
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // --- API calls ---
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`${API_ROOT}/carousal/home`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      const data = await res.json().catch(()=> ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `Fetch failed (${res.status})`);
      const list = data.data?.carousals || [];
      setItems(list);
    } catch (e) {
      setFetchError(e.message);
      toast.error(e.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createItem = async (payload) => {
    const res = await fetch(`${API_ROOT}/carousal/home`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', ...authHeader },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(()=> ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Create failed (${res.status})`);
    return data.data; // backend may or may not echo object; adjust if needed
  };

  const updateItemApi = async (id, payload) => {
    const res = await fetch(`${API_ROOT}/carousal/home/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/json', ...authHeader },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(()=> ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Update failed (${res.status})`);
    return data.data;
  };

  const deleteItemApi = async (id) => {
    const res = await fetch(`${API_ROOT}/carousal/home/${id}`, {
      method: 'DELETE',
      headers: { ...authHeader }
    });
    const data = await res.json().catch(()=> ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Delete failed (${res.status})`);
    return true;
  };

  useEffect(() => { fetchItems(); }, [fetchItems]); // initial load

  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      items.filter(i => i.title?.toLowerCase().includes(s))
    );
  }, [items, search]);

  const openCreate = () => {
    setEditing(emptyItem());
    setShowModal(true);
  };
  const openEdit = (item) => { setEditing({ ...item }); setShowModal(true); };
  const closeModal = () => { if (saving) return; setShowModal(false); setEditing(null); };

  const saveItem = async () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error('Title required', { className:'toast-shell', progressClassName:'toast-progress-red' });
      return;
    }
    if (!editing.imagePath.trim()) {
      toast.error('Image URL required', { className:'toast-shell', progressClassName:'toast-progress-red' });
      return;
    }
    setSaving(true);
    try {
      if (editing.id) {
        await updateItemApi(editing.id, { title: editing.title.trim(), imagePath: editing.imagePath.trim() });
        toast.success('Slide updated', { className:'toast-shell', progressClassName:'toast-progress-green' });
      } else {
        await createItem({ title: editing.title.trim(), imagePath: editing.imagePath.trim() });
        toast.success('Slide added', { className:'toast-shell', progressClassName:'toast-progress-green' });
      }
      closeModal();
      fetchItems(); // refresh list
    } catch (e) {
      toast.error(e.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this slide?')) return;
    setDeletingId(id);
    try {
      await deleteItemApi(id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success('Deleted', { className:'toast-shell', progressClassName:'toast-progress-green' });
    } catch (e) {
      toast.error(e.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Slider Section</h2>

      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search slides..."
            className="border rounded px-3 py-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={openCreate}
        >
          + Add Slide
        </button>
      </div>

      {fetchError && <div className="text-sm text-red-600 mb-4">{fetchError}</div>}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 w-12">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No slides found.
                </td>
              </tr>
            )}
            {filtered.map((slide, idx) => (
              <tr key={slide.id} className="border-t">
                <td className="px-4 py-2 align-top">{idx + 1}</td>
                <td className="px-4 py-2 align-top">
                  {slide.imagePath ? (
                    <img
                      src={buildImageUrl(slide.imagePath)}
                      alt={slide.title}
                      className="w-28 h-16 object-cover rounded border"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 align-top">{slide.title}</td>
                <td className="px-4 py-2 align-top text-center space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    onClick={() => openEdit(slide)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-xs font-medium disabled:opacity-40"
                    onClick={() => deleteItem(slide.id)}
                    disabled={deletingId === slide.id}
                  >
                    {deletingId === slide.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center overflow-y-auto p-6">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editing.id ? 'Edit Slide' : 'Add Slide'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
                disabled={saving}
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Slide title"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Image URL (imagePath)
                </label>
                <input
                  type="text"
                  value={editing.imagePath}
                  onChange={(e) => setEditing(prev => ({ ...prev, imagePath: e.target.value }))}
                  className="w-full px-3 py-2 border rounded mb-2"
                  placeholder="https://... or /carousal/xyz.webp"
                />
                <div className="flex items-center gap-3 mb-2">
                  <label className="inline-flex items-center px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-xs rounded cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try {
                          const path = await uploadFile({ file, token, base: API_ROOT });
                          setEditing(prev => ({ ...prev, imagePath: path }));
                          toast.success('Image uploaded', { className:'toast-shell', progressClassName:'toast-progress-green' });
                        } catch (err) {
                          toast.error(err.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
                        } finally {
                          setUploading(false);
                          e.target.value = '';
                        }
                      }}
                    />
                    {uploading ? 'Uploading…' : 'Upload Image'}
                  </label>
                  {editing.imagePath && (
                    <span className="text-[10px] text-green-600 break-all">
                      {editing.imagePath}
                    </span>
                  )}
                </div>
                {editing.imagePath && (
                  <img
                    src={buildImageUrl(editing.imagePath)}
                    alt="preview"
                    className="h-24 w-44 object-cover rounded border mt-2"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-50"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={saveItem}
                className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderSection;
