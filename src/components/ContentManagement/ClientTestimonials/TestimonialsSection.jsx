import React, { useEffect, useState } from 'react';

// Adjust to real backend base (examples from Postman screenshot)
const API_BASE = '/api/v1/carousal/home/..'; // replace with actual
const REVIEWS_BASE = '/api/v1/reviews';      // e.g. https://meinhouse-backend.onrender.com/api/v1/reviews

const emptyReview = () => ({
  id: null,
  rating: '',
  review: '',
  name: '',
  company: '',
  country: ''
});

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  // -------- API STUBS (uncomment & adapt) ----------
  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      // const res = await fetch(`${REVIEWS_BASE}/client`); // adjust endpoint (Get all client reviews)
      // if(!res.ok) throw new Error('Failed to fetch reviews');
      // const json = await res.json();
      // setReviews(json?.data?.reviews || []);
      // TEMP seed (remove later)
      setReviews([
        {
          id: '1',
          rating: '4.6',
          review: 'Awesome',
          name: 'Manikumar',
          company: 'Abc',
          country: 'India',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          rating: '4.5',
            review: 'Great place',
            name: 'Arul',
            company: 'Abc',
            country: 'India',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
      ]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (payload) => {
    // const res = await fetch(`${REVIEWS_BASE}/create`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    //   body: JSON.stringify(payload)
    // });
    // if(!res.ok) throw new Error('Create failed');
    // const json = await res.json();
    // return json.data.review; // adapt to real response
    return {
      ...payload,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  const updateReviewApi = async (id, payload) => {
    // const res = await fetch(`${REVIEWS_BASE}/update/${id}`, { method:'PUT', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}, body: JSON.stringify(payload) });
    // if(!res.ok) throw new Error('Update failed');
    // const json = await res.json();
    // return json.data.review;
    return { ...payload, id, updatedAt: new Date().toISOString(), createdAt: payload.createdAt || new Date().toISOString() };
  };

  const deleteReviewApi = async (id) => {
    // const res = await fetch(`${REVIEWS_BASE}/delete/${id}`, { method:'DELETE', headers:{ Authorization: `Bearer ${token}` }});
    // if(!res.ok) throw new Error('Delete failed');
    return true;
  };
  // --------------------------------------------------

  useEffect(() => {
    fetchReviews();
  }, []);

  const filtered = reviews.filter(r => {
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.review.toLowerCase().includes(q) ||
      (r.company || '').toLowerCase().includes(q) ||
      (r.country || '').toLowerCase().includes(q)
    );
  });

  const openCreate = () => {
    setEditing(emptyReview());
    setShowModal(true);
    setError('');
  };

  const openEdit = (rev) => {
    setEditing({ ...rev });
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

  const validate = (rev) => {
    if (!rev.name) return 'Name required';
    if (!rev.review) return 'Review text required';
    if (!rev.rating) return 'Rating required';
    if (Number(rev.rating) < 0 || Number(rev.rating) > 5) return 'Rating must be 0 - 5';
    return '';
  };

  const saveReview = async () => {
    if (!editing) return;
    const v = validate(editing);
    if (v) {
      setError(v);
      return;
    }
    setSaving(true);
    setError('');
    try {
      let saved;
      if (editing.id) {
        saved = await updateReviewApi(editing.id, editing);
        setReviews(prev => prev.map(r => (r.id === saved.id ? saved : r)));
      } else {
        saved = await createReview(editing);
        setReviews(prev => [saved, ...prev]);
      }
      closeModal();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteReviewApi(id);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      alert(e.message);
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

      {error && !showModal && (
        <div className="text-sm text-red-600">{error}</div>
      )}

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
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  No reviews
                </td>
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
                    {r.review.length > 60 ? r.review.slice(0, 60) + '...' : r.review}
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
                <label className="block text-xs font-medium text-gray-600 mb-1">Rating (0 - 5, decimals ok)</label>
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
