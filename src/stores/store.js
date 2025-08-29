import { configureStore } from '@reduxjs/toolkit';
import authReducer from './api/authSlice';
import { authApi } from './api/auth/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware)
});