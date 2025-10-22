import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Normalize base (remove all trailing /)
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const adminSignin = createAsyncThunk(
  'auth/adminSignin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const url = `${API_BASE}/admin/signin`; // guaranteed single slash
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || `Login failed (${res.status})`);
      }

      localStorage.setItem('admin_access', data.data.accessToken);
      localStorage.setItem('admin_refresh', data.data.refreshToken);

      return {
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken
      };
    } catch (e) {
      return rejectWithValue(e.message || 'Network error');
    }
  }
);

export const rotateAccessToken = createAsyncThunk(
  'auth/rotateAccessToken',
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth?.accessToken;
      const url = `${API_BASE}/new-access-token`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        if (res.status === 401) return rejectWithValue('Unauthorized');
        return rejectWithValue(data.message || `Rotate failed (${res.status})`);
      }
      localStorage.setItem('admin_access', data.data.accessToken);
      return { accessToken: data.data.accessToken };
    } catch (e) {
      return rejectWithValue(e.message || 'Network error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('admin_access') || null,
    refreshToken: localStorage.getItem('admin_refresh') || null,
    status: 'idle',
    error: null
  },
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken || null;
      state.refreshToken = action.payload.refreshToken || null;
    },
    adminLogout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('admin_access');
      localStorage.removeItem('admin_refresh');
    }
  }
});

export const { adminLogout, setTokens } = authSlice.actions;
export default authSlice.reducer;