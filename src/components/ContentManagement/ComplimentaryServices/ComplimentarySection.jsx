import React, { useState, useEffect } from 'react';

const API_BASE = '/api/v1/complimentary_service'; // GET (list) POST (create) PUT /:id DELETE /:id

const fileToDataUrl = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

const emptyService = () => ({
  id: null,
  name: '',
  description: '',
  picPath: '',
  isActive: true,
  order: 0
});

const ComplimentarySection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  // ---- API STUBS (replace with real calls) ----
  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      // const res = await fetch(API_BASE);
      // if(!res.ok) throw new Error('Fetch failed');
      // const json = await res.json();
      // setServices(json.data.services);
      setServices([
        {
          id: '1',
          name: 'Real Estate Services',
          description:
            'In MEINHAUS commitment ... refer you the top local professional.',
          picPath:
            'https://dev-carenest.s3.ap-south-1.amazonaws.com/service/sample1.webp',
          isActive: true,
          order: 1
        },
        {
          id: '2',
          name: 'Lending Services',
            description: 'Professional lending and financing solutions.',
            picPath: 'https://dev-carenest.s3.ap-south-1.amazonaws.com/service/sample2.webp',
            isActive: true,
            order: 2
        }
      ]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (payload) => {
    // const res = await fetch(API_BASE,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    // if(!res.ok) throw new Error('Create failed');
    // const json = await res.json();
    // return json.data.service;
    return { ...payload, id: Date.now().toString() }; // mock
  };

  const updateServiceApi = async (id, payload) => {
    // const res = await fetch(`${API_BASE}/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    // if(!res.ok) throw new Error('Update failed');
    // const json = await res.json();
    // return json.data.service;
    return { ...payload, id };
  };

  const deleteServiceApi = async (id) => {
    // const res = await fetch(`${API_BASE}/${id}`,{method:'DELETE'});
    // if(!res.ok) throw new Error('Delete failed');
    return true;
  };
  // ---------------------------------------------

  useEffect(() => {
    fetchServices();
  }, []);

  const filtered = services
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.order - b.order);

  const openCreate = () => {
    setEditing({ ...emptyService(), order: (services.length ? Math.max(...services.map(s => s.order)) + 1 : 1) });
    setShowModal(true);
    setError('');
  };

  const openEdit = (svc) => {
    setEditing({ ...svc });
    setShowModal(true);
    setError('');
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
    const url = await fileToDataUrl(file); // replace with actual upload -> URL
    handleField('picPath', url);
  };

  const validate = (svc) => {
    if (!svc.name) return 'Name required';
    if (!svc.description) return 'Description required';
    if (!svc.picPath) return 'Image required';
    return '';
  };

  const saveService = async () => {
    if (!editing) return;
    const v = validate(editing);
    if (v) {
      setError(v);
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        picPath: editing.picPath,
        name: editing.name,
        description: editing.description,
        isActive: editing.isActive,
        order: editing.order
      };
      let saved;
      if (editing.id) {
        saved = await updateServiceApi(editing.id, payload);
        setServices(prev => prev.map(s => (s.id === saved.id ? saved : s)));
      } else {
        saved = await createService(payload);
        setServices(prev => [...prev, saved]);
      }
      closeModal();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteServiceApi(id);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const toggleActive = (id) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const setOrder = (id, value) => {
    const num = Number(value) || 0;
    setServices(prev =>
      prev
        .map(s => (s.id === id ? { ...s, order: num } : s))
        .sort((a, b) => a.order - b.order)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complimentary Services</h2>
          <p className="text-gray-600 text-sm mt-1">Manage complimentary services list</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-64"
          />
          <button
            onClick={openCreate}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            + Add Service
          </button>
        </div>
      </div>

      {error && !showModal && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left font-semibold text-gray-700">
              <th className="px-4 py-2 w-10">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 text-center">Order</th>
              <th className="px-4 py-2 text-center">Active</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">Loading...</td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">No services</td>
              </tr>
            )}
            {filtered.map((s, idx) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-2 align-top">{idx + 1}</td>
                <td className="px-4 py-2 align-top">
                  {s.picPath ? (
                    <img
                      src={s.picPath}
                      alt={s.name}
                      className="w-20 h-14 object-cover rounded border"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 align-top font-medium">{s.name || '-'}</td>
                <td className="px-4 py-2 align-top max-w-xs">
                  {s.description.length > 80
                    ? s.description.slice(0, 80) + '...'
                    : s.description || '-'}
                </td>
                <td className="px-4 py-2 align-top text-center">
                  <input
                    type="number"
                    className="w-16 px-2 py-1 border rounded text-center"
                    value={s.order}
                    onChange={e => setOrder(s.id, e.target.value)}
                  />
                </td>
                <td className="px-4 py-2 align-top text-center">
                  <button
                    onClick={() => toggleActive(s.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      s.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-2 align-top text-center space-x-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteService(s.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium"
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
                {editing.id ? 'Edit Service' : 'Add Service'}
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
                <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={e => handleField('name', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Service name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={editing.description}
                  onChange={e => handleField('description', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Service description"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Image URL (picPath)</label>
                <div className="flex gap-4 flex-wrap items-start">
                  <div>
                    <input
                      type="text"
                      value={editing.picPath}
                      onChange={e => handleField('picPath', e.target.value)}
                      className="w-72 px-3 py-2 border rounded mb-2"
                      placeholder="https://..."
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageFile(e.target.files?.[0] || null)}
                      className="text-xs"
                      disabled={saving}
                    />
                    <p className="text-[10px] text-gray-500 mt-1">
                      Paste URL or upload (mock upload).
                    </p>
                  </div>
                  {editing.picPath && (
                    <img
                      src={editing.picPath}
                      alt="preview"
                      className="h-24 w-32 object-cover rounded border"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Order</label>
                  <input
                    type="number"
                    value={editing.order}
                    onChange={e => handleField('order', Number(e.target.value))}
                    className="w-24 px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                  <select
                    value={editing.isActive ? 'active' : 'inactive'}
                    onChange={e => handleField('isActive', e.target.value === 'active')}
                    className="w-28 px-3 py-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
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
                onClick={saveService}
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

export default ComplimentarySection;
