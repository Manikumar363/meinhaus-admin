import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../lib/utils/uploadFile';

// Root from env
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

// Helper: build full image URL if backend returns relative picPath
const buildImageUrl = (p) => {
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;
  // Adjust if backend serves static differently
  return `https://dev-carenest.s3.ap-south-1.amazonaws.com${p}`;
};

const emptyArticle = () => ({
  id: null,
  picPath: '',
  author: '',
  title: '',
  description: '',
  content: '',
});

const ArticlesSection = () => {
  const token = useSelector(s => s.auth.accessToken);
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // article in form
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [viewingId, setViewingId] = useState(null); // when fetching details
  const [uploading, setUploading] = useState(false);

  // ---- API Calls ----
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(`${API_BASE}/article`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `Fetch failed (${res.status})`);
      const list = data.data?.articles || [];
      setArticles(list);
    } catch (e) {
      setFetchError(e.message);
      toast.error(e.message, { className: 'toast-shell', progressClassName: 'toast-progress-red' });
    } finally {
      setLoading(false);
    }
  }, [token]); // was [API_BASE, authHeader]

  const fetchDetails = async (id) => {
    setViewingId(id);
    try {
      const res = await fetch(`${API_BASE}/article/${id}`, { headers: { ...authHeader } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || 'Fetch details failed');
      const art = data.data?.article;
      if (art) {
        setEditing({
          id: art.id,
          picPath: art.picPath || '',
            author: art.author || '',
          title: art.title || '',
          description: art.description || '',
          content: art.content || '',
        });
        setShowModal(true);
      }
    } catch (e) {
      toast.error(e.message, { className: 'toast-shell', progressClassName: 'toast-progress-red' });
    } finally {
      setViewingId(null);
    }
  };

  const createArticle = async (payload) => {
    const res = await fetch(`${API_BASE}/article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Create failed (${res.status})`);
    // If backend returns created article, merge; else refetch
    return data.data?.article || null;
  };

  const updateArticleApi = async (id, payload) => {
    const res = await fetch(`${API_BASE}/article/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Update failed (${res.status})`);
    return data.data?.article || null;
  };

  // Delete endpoint in your prompt shows /carousal/home/:id (likely a typo).
  // Assuming delete article should be: DELETE /article/:id
  const deleteArticleApi = async (id) => {
    const res = await fetch(`${API_BASE}/article/${id}`, {
      method: 'DELETE',
      headers: { ...authHeader }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Delete failed (${res.status})`);
    return true;
  };

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ---- Handlers ----
  const openCreate = () => {
    setEditing(emptyArticle());
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;
    setShowModal(false);
    setEditing(null);
  };

  const handleField = (field, value) => {
    setEditing(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const saveArticle = async () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error('Title required', { className: 'toast-shell', progressClassName: 'toast-progress-red' });
      return;
    }
    if (!editing.description.trim()) {
      toast.error('Description required', { className: 'toast-shell', progressClassName: 'toast-progress-red' });
      return;
    }
    if (!editing.content.trim()) {
      toast.error('Content required', { className: 'toast-shell', progressClassName: 'toast-progress-red' });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        picPath: editing.picPath,
        author: editing.author,
        title: editing.title,
        description: editing.description,
        content: editing.content
      };
      if (editing.id) {
        const updated = await updateArticleApi(editing.id, payload);
        if (updated) {
          setArticles(prev => prev.map(a => a.id === editing.id
            ? { ...a, ...updated }
            : a));
        } else {
          // fallback refresh if backend does not return updated article
          fetchAll();
        }
        toast.success('Article updated', { className: 'toast-shell', progressClassName: 'toast-progress-green' });
      } else {
        const created = await createArticle(payload);
        if (created) {
          setArticles(prev => [...prev, created]);
        } else {
          fetchAll();
        }
        toast.success('Article created', { className: 'toast-shell', progressClassName: 'toast-progress-green' });
      }
      closeModal();
    } catch (e) {
      toast.error(e.message, { className: 'toast-shell', progressClassName: 'toast-progress-red' });
    } finally {
      setSaving(false);
    }
  };

  const deleteArticle = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    setDeletingId(id);
    try {
      await deleteArticleApi(id);
      setArticles(prev => prev.filter(a => a.id !== id));
      toast.success('Deleted', { className: 'toast-shell', progressClassName: 'toast-progress-green' });
    } catch (e) {
      toast.error(e.message, { className: 'toast-shell', progressClassName: 'toast-progress-red' });
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = articles.filter(a =>
    a.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <h2 className="text-lg font-semibold">Articles</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search title..."
            className="border rounded px-3 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={openCreate}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Article
          </button>
        </div>
      </div>

      {fetchError && (
        <div className="text-sm text-red-600">{fetchError}</div>
      )}

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-3 py-2 w-10">#</th>
              <th className="px-3 py-2">Image</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Author</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                  No articles.
                </td>
              </tr>
            )}
            {filtered.map((a, idx) => (
              <tr key={a.id} className="border-t">
                <td className="px-3 py-2 align-top">{idx + 1}</td>
                <td className="px-3 py-2 align-top">
                  {a.picPath ? (
                    <img
                      src={buildImageUrl(a.picPath)}
                      alt=""
                      className="h-14 w-20 object-cover rounded border"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-3 py-2 align-top">
                  {a.title || <span className="text-gray-400 italic">Untitled</span>}
                </td>
                <td className="px-3 py-2 align-top">{a.author || '-'}</td>
                <td className="px-3 py-2 align-top">
                  <span className="line-clamp-3">{a.description}</span>
                </td>
                <td className="px-3 py-2 align-top text-center space-x-2">
                  <button
                    onClick={() => fetchDetails(a.id)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium disabled:opacity-40"
                    disabled={viewingId === a.id}
                  >
                    {viewingId === a.id ? 'Loading...' : 'Edit'}
                  </button>
                  <button
                    onClick={() => deleteArticle(a.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium disabled:opacity-40"
                    disabled={deletingId === a.id}
                  >
                    {deletingId === a.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto p-6">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editing.id ? 'Edit Article' : 'Create Article'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
                disabled={saving}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => handleField('title', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Article title"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={editing.author}
                  onChange={(e) => handleField('author', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Author name"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) => handleField('description', e.target.value)}
                  className="w-full px-3 py-2 border rounded resize-none"
                  placeholder="Short summary"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Content (HTML allowed)
                </label>
                <textarea
                  rows={8}
                  value={editing.content}
                  onChange={(e) => handleField('content', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="<p>Full article content...</p>"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Image (picPath)
                </label>
                <input
                  type="text"
                  value={editing.picPath}
                  onChange={(e) => handleField('picPath', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="https://... or /carousal/xyz.webp"
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
                          toast.error(err.message, { className:'toast-shell', progressClassName:'toast-progress-red' });
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
                    className="h-24 w-32 object-cover rounded border mt-3"
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
                onClick={saveArticle}
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

export default ArticlesSection;
