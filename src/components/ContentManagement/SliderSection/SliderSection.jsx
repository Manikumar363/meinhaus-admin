import React, { useState, useEffect } from 'react';

// Adjust if actual backend differs
const API_BASE = '/api/home/carousal'; // endpoints: GET (list), POST (add), PUT /:id (update), DELETE /:id (delete)

// Helper: convert file -> base64 (replace with real upload later)
const fileToDataUrl = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

const emptyItem = () => ({
  id: null,
  title: '',
  imageUrl: '',
  isActive: true,
  order: 0
});

const SliderSection = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // current item
  const [saving, setSaving] = useState(false);

  // -------- API STUBS (uncomment & implement with real backend) ----------
  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      // const res = await fetch(API_BASE);
      // if(!res.ok) throw new Error('Failed to fetch');
      // const data = await res.json();
      // setItems(data);
      // TEMP seed (remove)
      const seed = [
        { id: 1, title: 'Slider One', imageUrl: '/slider-1.jpg', isActive: true, order: 1 },
        { id: 2, title: 'Slider Two', imageUrl: '/slider-2.jpg', isActive: false, order: 2 }
      ];
      setItems(seed);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (payload) => {
    // const res = await fetch(API_BASE,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    // if(!res.ok) throw new Error('Create failed');
    // return await res.json();
    return { ...payload, id: Date.now() }; // mock
  };

  const updateItemApi = async (id, payload) => {
    // const res = await fetch(`${API_BASE}/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    // if(!res.ok) throw new Error('Update failed');
    // return await res.json();
    return { ...payload, id }; // mock
  };

  const deleteItemApi = async (id) => {
    // const res = await fetch(`${API_BASE}/${id}`,{method:'DELETE'});
    // if(!res.ok) throw new Error('Delete failed');
    return true;
  };
  // ----------------------------------------------------------------------

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      items
        .filter(i => i.title.toLowerCase().includes(s))
        .sort((a, b) => a.order - b.order)
    );
  }, [items, search]);

  const openCreate = () => {
    setEditing({ ...emptyItem(), order: (items.length ? Math.max(...items.map(i => i.order)) + 1 : 1) });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing({ ...item });
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;
    setShowModal(false);
    setEditing(null);
    setError('');
  };

  const handleField = (field, value) => {
    setEditing(prev => ({ ...prev, [field]: value }));
  };

  const handleImageFile = async (file) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    handleField('imageUrl', url);
  };

  const saveItem = async () => {
    if (!editing) return;
    if (!editing.title) {
      setError('Title is required');
      return;
    }
    if (!editing.imageUrl) {
      setError('Image is required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      let saved;
      if (editing.id) {
        saved = await updateItemApi(editing.id, editing);
        setItems(prev => prev.map(i => (i.id === saved.id ? saved : i)));
      } else {
        saved = await createItem(editing);
        setItems(prev => [...prev, saved]);
      }
      closeModal();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this slide?')) return;
    try {
      await deleteItemApi(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const toggleActive = (id) => {
    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, isActive: !i.isActive } : i
      )
    );
  };

  const setOrder = (id, value) => {
    const num = Number(value) || 0;
    setItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, order: num } : i))
        .sort((a, b) => a.order - b.order)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Slider Section</h2>

      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search slides..."
            className="border rounded px-3 py-2 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={openCreate}
        >
          + Add Slide
        </button>
      </div>

      {error && !showModal && <div className="text-sm text-red-600 mb-4">{error}</div>}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 w-12">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2 text-center">Order</th>
              <th className="px-4 py-2 text-center">Active</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No slides found.
                </td>
              </tr>
            )}
            {filtered.map((slide, idx) => (
              <tr key={slide.id} className="border-t">
                <td className="px-4 py-2 align-top">{idx + 1}</td>
                <td className="px-4 py-2 align-top">
                  {slide.imageUrl ? (
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-24 h-14 object-cover rounded border"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 align-top">{slide.title}</td>
                <td className="px-4 py-2 align-top text-center">
                  <input
                    type="number"
                    className="w-16 px-2 py-1 border rounded text-center"
                    value={slide.order}
                    onChange={(e) => setOrder(slide.id, e.target.value)}
                  />
                </td>
                <td className="px-4 py-2 align-top text-center">
                  <button
                    onClick={() => toggleActive(slide.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      slide.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {slide.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-2 align-top text-center space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    onClick={() => openEdit(slide)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-xs font-medium"
                    onClick={() => deleteItem(slide.id)}
                  >
                    Delete
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

              {error && (
                <div className="mb-3 text-sm text-red-600">{error}</div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) => handleField('title', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Slide title"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={editing.order}
                    onChange={(e) => handleField('order', Number(e.target.value))}
                    className="w-32 px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Status
                  </label>
                  <select
                    value={editing.isActive ? 'active' : 'inactive'}
                    onChange={(e) => handleField('isActive', e.target.value === 'active')}
                    className="w-40 px-3 py-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Image URL
                  </label>
                  <div className="flex gap-4 flex-wrap items-start">
                    <div>
                      <input
                        type="text"
                        value={editing.imageUrl}
                        onChange={(e) => handleField('imageUrl', e.target.value)}
                        className="w-72 px-3 py-2 border rounded mb-2"
                        placeholder="https://..."
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFile(e.target.files?.[0] || null)}
                        className="text-xs"
                        disabled={saving}
                      />
                      <p className="text-[10px] text-gray-500 mt-1">
                        Paste URL or upload file.
                      </p>
                    </div>
                    {editing.imageUrl && (
                      <img
                        src={editing.imageUrl}
                        alt="preview"
                        className="h-24 w-40 object-cover rounded border"
                      />
                    )}
                  </div>
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
