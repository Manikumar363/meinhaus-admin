import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../lib/utils/uploadFile';
import { ErrorToast, SuccessToast } from '../../ui/Toasts';

// API root from .env (no trailing slash)
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

// Endpoints:
// GET    /comp-services
// POST   /comp-services                { picPath, name, description }
// PUT    /comp-services/:id            { picPath, name, description }
// DELETE /comp-services/:id
//
// If picPath comes back relative, prepend asset origin.
const buildImageUrl = (p) => {
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;
  return `https://dev-carenest.s3.ap-south-1.amazonaws.com${p}`;
};

const emptyService = () => ({
  id: null,
  picPath: '',
  name: '',
  description: ''
});

const ComplimentarySection = () => {
  const token = useSelector(s => s.auth.accessToken);
  const authHeader = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : {}), [token]);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ---- API calls (memoized) ----
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`${API_BASE}/comp-services`, { headers: { ...authHeader } });
      const data = await res.json().catch(()=>({}));
      if (!res.ok || !data.success) throw new Error(data.message || `Fetch failed (${res.status})`);
      setServices(data.data?.services || []);
    } catch (e) {
      setFetchError(e.message);
      toast.error(e.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
    } finally {
      setLoading(false);
    }
  }, [authHeader]);

  const createService = async (payload) => {
    const res = await fetch(`${API_BASE}/comp-services`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', ...authHeader },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Create failed (${res.status})`);
    return data.data?.service || null;
  };

  const updateServiceApi = async (id, payload) => {
    const res = await fetch(`${API_BASE}/comp-services/${id}`, {
      method:'PUT',
      headers:{ 'Content-Type':'application/json', ...authHeader },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Update failed (${res.status})`);
    return data.data?.service || null;
  };

  const deleteServiceApi = async (id) => {
    const res = await fetch(`${API_BASE}/comp-services/${id}`, {
      method:'DELETE',
      headers:{ ...authHeader }
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Delete failed (${res.status})`);
    return true;
  };

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const filtered = services.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  );

  // ---- Modal / Form ----
  const openCreate = () => {
    setEditing(emptyService());
    setShowModal(true);
  };
  const openEdit = (svc) => {
    setEditing({ ...svc });
    setShowModal(true);
  };
  const closeModal = () => {
    if (saving) return;
    setShowModal(false);
    setEditing(null);
  };
  const handleField = (field, value) => {
    setEditing(prev => ({ ...prev, [field]: value }));
  };

  const validate = (svc) => {
    if (!svc.name.trim()) return 'Name required';
    if (!svc.description.trim()) return 'Description required';
    if (!svc.picPath.trim()) return 'Image URL required';
    return '';
  };

  const saveService = async () => {
    if (!editing) return;
    const v = validate(editing);
    if (v) {
      toast.error(v, { className:'toast-shell', progressClassName:'toast-progress-red' });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        picPath: editing.picPath.trim(),
        name: editing.name.trim(),
        description: editing.description.trim()
      };
      if (editing.id) {
        const updated = await updateServiceApi(editing.id, payload);
        if (updated) {
          setServices(prev => prev.map(s => s.id === editing.id ? { ...s, ...updated } : s));
        } else {
          fetchServices();
        }
        toast(<SuccessToast message="Service updated" />, {
          className:'toast-shell',
          progressClassName:'toast-progress-green',
          autoClose:3000
        });
      } else {
        const created = await createService(payload);
        if (created) setServices(prev => [created, ...prev]);
        else fetchServices();
        toast(<SuccessToast message="Service added" />, {
          className:'toast-shell',
          progressClassName:'toast-progress-green',
          autoClose:3000
        });
      }
      closeModal();
    } catch (e) {
      toast(<ErrorToast message={e.message} />, {
        className:'toast-shell',
        progressClassName:'toast-progress-red',
        autoClose:5000
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    setDeletingId(id);
    try {
      await deleteServiceApi(id);
      setServices(prev => prev.filter(s => s.id !== id));
      toast.success('Deleted', { className:'toast-shell', progressClassName:'toast-progress-green' });
    } catch (e) {
      toast.error(e.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complimentary Services</h2>
          <p className="text-gray-600 text-sm mt-1">Manage services list</p>
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

      {fetchError && <div className="text-sm text-red-600">{fetchError}</div>}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left font-semibold text-gray-700">
              <th className="px-4 py-2 w-12">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">Loading...</td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No services</td>
              </tr>
            )}
            {filtered.map((s, idx) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-2 align-top">{idx + 1}</td>
                <td className="px-4 py-2 align-top">
                  {s.picPath ? (
                    <img
                      src={buildImageUrl(s.picPath)}
                      alt={s.name}
                      className="w-20 h-14 object-cover rounded border"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 align-top font-medium">{s.name}</td>
                <td className="px-4 py-2 align-top max-w-xs">
                  {s.description?.length > 90
                    ? s.description.slice(0, 90) + '...'
                    : s.description}
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
                    className="text-red-600 hover:text-red-800 text-xs font-medium disabled:opacity-40"
                    disabled={deletingId === s.id}
                  >
                    {deletingId === s.id ? 'Deleting…' : 'Delete'}
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

            <div className="space-y-5">
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
                  rows={5}
                  value={editing.description}
                  onChange={e => handleField('description', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Service description"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Image URL (picPath)</label>
                <input
                  type="text"
                  value={editing.picPath}
                  onChange={e => handleField('picPath', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="https://... or /service/xyz.webp"
                />
                <div className="flex items-center gap-3 mt-2">
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
                          const path = await uploadFile({ file, token, base: API_BASE });
                          handleField('picPath', path);
                          toast.success('Image uploaded', { className:'toast-shell', progressClassName:'toast-progress-green' });
                        } catch (err) {
                          toast(<ErrorToast message={err.message} />, {
                            className:'toast-shell',
                            progressClassName:'toast-progress-red'
                          });
                        } finally {
                          setUploading(false);
                          e.target.value = '';
                        }
                      }}
                    />
                    {uploading ? 'Uploading…' : 'Upload Image'}
                  </label>
                  {editing.picPath && (
                    <span className="text-[10px] text-green-600 break-all">{editing.picPath}</span>
                  )}
                </div>
                {editing.picPath && (
                  <img
                    src={buildImageUrl(editing.picPath)}
                    alt="preview"
                    className="h-24 w-36 object-cover rounded border mt-3"
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
                onClick={saveService}
                className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplimentarySection;
