export async function uploadFile({ file, token, base }) {
  const API_BASE = (base || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${API_BASE}/admin/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: fd
  });
  let data;
  try { data = await res.json(); } catch { data = {}; }
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `Upload failed (${res.status})`);
  }
  // Try common field names
  const path =
    data.data?.path ||
    data.data?.url ||
    data.path ||
    data.url ||
    data.data?.filePath ||
    '';
  if (!path) throw new Error('No path returned');
  return path;
}