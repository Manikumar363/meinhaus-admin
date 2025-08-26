import React, { useState, useEffect } from 'react';

// TODO: Adjust to your actual backend base path
const API_BASE = '/api/article'; // e.g. https://api.example.com/article

// Utility: create slug from title
const slugify = (str='') =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g,'')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-');

// Fake upload (base64). Replace with real uploader returning a URL.
const fileToDataUrl = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

const emptyArticle = () => ({
  id: null,                // backend id
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  imageUrl: '',
  category: '',
  tags: [],                // string[]
  status: 'draft',         // draft | published
  order: 0,
  readTime: 0,             // minutes
  metaTitle: '',
  metaDescription: '',
});

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null); // article object in modal
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // --- API stubs (uncomment & adapt when backend ready) ---
  const fetchAllArticles = async () => {
    setLoading(true);
    setError('');
    try {
      // const res = await fetch(API_BASE);
      // if(!res.ok) throw new Error('Failed to fetch');
      // const data = await res.json();
      // setArticles(data);
      // TEMP static seed (remove later)
      setArticles([
        {
          ...emptyArticle(),
          id: 1,
            title: 'Sit quaerat omnis ve',
            slug: 'sit-quaerat-omnis-ve',
            excerpt: 'Incididunt id sunt...',
            content: 'Full article content here...',
            imageUrl: '/article-1.jpg',
            category: 'General',
            tags: ['kitchen','design'],
            status: 'published',
            order: 1,
            readTime: 4,
            metaTitle: 'Sit quaerat omnis ve',
            metaDescription: 'Incididunt id sunt...'
        },
        {
          ...emptyArticle(),
          id: 2,
            title: 'Expedita similique s',
            slug: 'expedita-similique-s',
            excerpt: 'Eos maxime laborum...',
            content: 'Second article content...',
            imageUrl: '/article-2.jpg',
            category: 'General',
            tags: ['flowers'],
            status: 'published',
            order: 2,
            readTime: 3,
            metaTitle: 'Expedita similique',
            metaDescription: 'Eos maxime laborum...'
        }
      ]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (payload) => {
    // const res = await fetch(API_BASE,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    // if(!res.ok) throw new Error('Create failed');
    // return await res.json();
    return { ...payload, id: Date.now() }; // temp mock
  };

  const updateArticleApi = async (id, payload) => {
    // const res = await fetch(`${API_BASE}/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    // if(!res.ok) throw new Error('Update failed');
    // return await res.json();
    return { ...payload, id }; // mock
  };

  const deleteArticleApi = async (id) => {
    // const res = await fetch(`${API_BASE}/${id}`,{method:'DELETE'});
    // if(!res.ok) throw new Error('Delete failed');
    return true;
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  // --- Handlers ---
  const openCreate = () => {
    setEditing({ ...emptyArticle() });
    setShowModal(true);
  };

  const openEdit = (art) => {
    setEditing({ ...art, tags: [...(art.tags || [])] });
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;
    setShowModal(false);
    setEditing(null);
    setError('');
  };

  const handleField = (field, value) => {
    setEditing(prev => {
      if (!prev) return prev;
      let next = { ...prev, [field]: value };
      if (field === 'title' && !prev.id) {
        next.slug = slugify(value);
        if (!next.metaTitle) next.metaTitle = value;
      }
      return next;
    });
  };

  const handleImageFile = async (file) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    handleField('imageUrl', url);
  };

  const handleTagsChange = (str) => {
    const tags = str
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    handleField('tags', tags);
  };

  const saveArticle = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const payload = { ...editing };
      // Normalize
      payload.tags = payload.tags || [];
      if (!payload.slug) payload.slug = slugify(payload.title);

      let saved;
      if (payload.id) {
        saved = await updateArticleApi(payload.id, payload);
        setArticles(prev => prev.map(a => (a.id === saved.id ? saved : a)));
      } else {
        saved = await createArticle(payload);
        setArticles(prev => [...prev, saved]);
      }
      closeModal();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteArticle = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await deleteArticleApi(id);
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const toggleStatus = (id) => {
    setArticles(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, status: a.status === 'published' ? 'draft' : 'published' }
          : a
      )
    );
  };

  // Sorting by order
  const setOrder = (id, value) => {
    const num = Number(value) || 0;
    setArticles(prev =>
      prev
        .map(a => (a.id === id ? { ...a, order: num } : a))
        .sort((a, b) => a.order - b.order)
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Articles</h2>
        <button
          onClick={openCreate}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Article
        </button>
      </div>

      {error && !showModal && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-3 py-2 w-10">#</th>
              <th className="px-3 py-2">Image</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Tags</th>
              <th className="px-3 py-2 text-center">Order</th>
              <th className="px-3 py-2 text-center">Status</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && articles.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-gray-500">
                  No articles. Create one.
                </td>
              </tr>
            )}
            {articles.map((a, idx) => (
              <tr key={a.id} className="border-t">
                <td className="px-3 py-2 align-top">{idx + 1}</td>
                <td className="px-3 py-2 align-top">
                  {a.imageUrl ? (
                    <img
                      src={a.imageUrl}
                      alt=""
                      className="h-14 w-20 object-cover rounded border"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-3 py-2 align-top">{a.title || <span className="text-gray-400 italic">Untitled</span>}</td>
                <td className="px-3 py-2 align-top">
                  <span className="text-gray-600">{a.slug}</span>
                </td>
                <td className="px-3 py-2 align-top">{a.category || '-'}</td>
                <td className="px-3 py-2 align-top">
                  {a.tags?.length ? a.tags.join(', ') : '-'}
                </td>
                <td className="px-3 py-2 align-top text-center">
                  <input
                    type="number"
                    className="w-16 px-2 py-1 border rounded text-center"
                    value={a.order}
                    onChange={(e) => setOrder(a.id, e.target.value)}
                  />
                </td>
                <td className="px-3 py-2 align-top text-center">
                  <button
                    onClick={() => toggleStatus(a.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      a.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {a.status}
                  </button>
                </td>
                <td className="px-3 py-2 align-top text-center space-x-2">
                  <button
                    onClick={() => openEdit(a)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteArticle(a.id)}
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

            {error && (
              <div className="mb-3 text-sm text-red-600">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
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
                  Slug (auto or edit)
                </label>
                <input
                  type="text"
                  value={editing.slug}
                  onChange={(e) => handleField('slug', slugify(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="auto-generated"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editing.category}
                  onChange={(e) => handleField('category', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Category"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editing.tags.join(', ')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="tag1, tag2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Read Time (min)
                </label>
                <input
                  type="number"
                  min="0"
                  value={editing.readTime}
                  onChange={(e) => handleField('readTime', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="5"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Excerpt
                </label>
                <textarea
                  value={editing.excerpt}
                  onChange={(e) => handleField('excerpt', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded resize-none"
                  placeholder="Short summary..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Content
                </label>
                <textarea
                  value={editing.content}
                  onChange={(e) => handleField('content', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Full article content..."
                />
              </div>
              <div className="md:col-span-2">
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
                      className="h-24 w-32 object-cover rounded border"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={editing.metaTitle}
                  onChange={(e) => handleField('metaTitle', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="SEO title"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={editing.metaDescription}
                  onChange={(e) => handleField('metaDescription', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded resize-none"
                  placeholder="SEO description"
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
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Status
                </label>
                <select
                  value={editing.status}
                  onChange={(e) => handleField('status', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
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
