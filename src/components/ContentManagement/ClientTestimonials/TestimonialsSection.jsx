import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const API_ROOT = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, ''); // from .env

const emptyReview = () => ({
  id: null,
  rating: '',
  review: '',
  name: '',
  company: '',
  country: ''
});

const TestimonialsSection = () => {
  const token = useSelector(s => s.auth.accessToken);
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // ---- API calls ----
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`${API_ROOT}/client-reviews`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok || !data.success) throw new Error(data.message || `Fetch failed (${res.status})`);
      setReviews(data.data?.reviews || []);
    } catch (e) {
      setFetchError(e.message);
      toast.error(e.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createReview = async (payload) => {
    const res = await fetch(`${API_ROOT}/client-reviews`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', ...authHeader },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Create failed (${res.status})`);
    // backend might not return review object; refetch instead
    return data.data?.review || null;
  };

  const updateReviewApi = async (id, payload) => {
    const res = await fetch(`${API_ROOT}/client-reviews/${id}`, {
      method:'PUT',
      headers:{ 'Content-Type':'application/json', ...authHeader },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Update failed (${res.status})`);
    return data.data?.review || null;
  };

  const deleteReviewApi = async (id) => {
    const res = await fetch(`${API_ROOT}/client-reviews/${id}`, {
      method:'DELETE',
      headers:{ ...authHeader }
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Delete failed (${res.status})`);
    return true;
  };

  useEffect(() => { fetchReviews(); }, [fetchReviews]); // was []

  const filtered = reviews.filter(r => {
    const q = search.toLowerCase();
    return (
      r.name?.toLowerCase().includes(q) ||
      r.review?.toLowerCase().includes(q) ||
      (r.company || '').toLowerCase().includes(q) ||
      (r.country || '').toLowerCase().includes(q)
    );
  });

  // ---- Modal handlers ----
  const openCreate = () => {
    setEditing(emptyReview());
    setShowModal(true);
  };
  const openEdit = (rev) => {
    setEditing({ ...rev });
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

  const validate = (rev) => {
    if (!rev.name.trim()) return 'Name required';
    if (!rev.review.trim()) return 'Review text required';
    if (rev.rating === '') return 'Rating required';
    const num = Number(rev.rating);
    if (Number.isNaN(num) || num < 0 || num > 5) return 'Rating must be 0 - 5';
    return '';
  };

  const saveReview = async () => {
    if (!editing) return;
    const v = validate(editing);
    if (v) {
      toast.error(v, { className:'toast-shell', progressClassName:'toast-progress-red' });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        rating: editing.rating.toString(),
        review: editing.review,
        name: editing.name,
        company: editing.company,
        country: editing.country
      };
      if (editing.id) {
        const updated = await updateReviewApi(editing.id, payload);
        if (updated) {
          setReviews(prev => prev.map(r => r.id === editing.id ? { ...r, ...updated } : r));
        } else {
          fetchReviews();
        }
        toast.success('Review updated', { className:'toast-shell', progressClassName:'toast-progress-green' });
      } else {
        const created = await createReview(payload);
        if (created) setReviews(prev => [created, ...prev]);
        else fetchReviews();
        toast.success('Review created', { className:'toast-shell', progressClassName:'toast-progress-green' });
      }
      closeModal();
    } catch (e) {
      toast.error(e.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    setDeletingId(id);
    try {
      await deleteReviewApi(id);
      setReviews(prev => prev.filter(r => r.id !== id));
      toast.success('Deleted', { className:'toast-shell', progressClassName:'toast-progress-green' });
    } catch (e) {
      toast.error(e.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Reviews</h2>
          <p className="text-gray-600 text-sm mt-1">Manage client testimonials</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-60"
          />
            <button
            onClick={openCreate}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            + Add Review
          </button>
        </div>
      </div>

      {fetchError && <div className="text-sm text-red-600">{fetchError}</div>}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left font-semibold text-gray-700">
              <th className="px-4 py-2 w-12">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Review</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">Loading...</td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">No reviews</td>
              </tr>
            )}
            {filtered.map((r, idx) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-2 align-top">{idx + 1}</td>
                <td className="px-4 py-2 align-top font-medium">{r.name}</td>
                <td className="px-4 py-2 align-top">{r.company || '-'}</td>
                <td className="px-4 py-2 align-top">{r.country || '-'}</td>
                <td className="px-4 py-2 align-top">
                  <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">
                    {r.rating}
                  </span>
                </td>
                <td className="px-4 py-2 align-top max-w-xs">
                  <span className="text-gray-700">
                    {r.review?.length > 60 ? r.review.slice(0, 60) + '...' : r.review}
                  </span>
                </td>
                <td className="px-4 py-2 align-top text-xs text-gray-500">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-4 py-2 align-top text-center space-x-2">
                  <button
                    onClick={() => openEdit(r)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteReview(r.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium disabled:opacity-40"
                    disabled={deletingId === r.id}
                  >
                    {deletingId === r.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center overflow-y-auto p-6">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editing.id ? 'Edit Review' : 'Add Review'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
                disabled={saving}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={e => handleField('name', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Client name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
                  <input
                    type="text"
                    value={editing.company}
                    onChange={e => handleField('company', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Company"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                  <input
                    type="text"
                    value={editing.country}
                    onChange={e => handleField('country', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Country"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Rating (0 - 5)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  value={editing.rating}
                  onChange={e => handleField('rating', e.target.value)}
                  className="w-40 px-3 py-2 border rounded"
                  placeholder="4.5"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Review</label>
                <textarea
                  rows={4}
                  value={editing.review}
                  onChange={e => handleField('review', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Review text..."
                />
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
                onClick={saveReview}
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

export default TestimonialsSection;
