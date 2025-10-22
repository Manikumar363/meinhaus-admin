import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokens, adminLogout } from '../authSlice';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: API_BASE,
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
    });
    const result = await rawBaseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 || result?.error?.status === 403) {
      localStorage.removeItem('admin_access');
      localStorage.removeItem('admin_refresh');
      api.dispatch(adminLogout());
      // Redirect to login page
      window.location.href = '/auth/signin';
    }
    return result;
  },
  endpoints: (builder) => ({
    adminSignin: builder.mutation({
      query: ({ email, password }) => ({
        url: '/admin/signin',
        method: 'POST',
        body: { email, password }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            localStorage.setItem('admin_access', data.data.accessToken);
            localStorage.setItem('admin_refresh', data.data.refreshToken);
            dispatch(setTokens({
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken
            }));
          }
        } catch (_) {
          /* ignore */
        }
      }
    }),
    rotateAccessToken: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: '/new-access-token',
        method: 'POST',
        body: { currentPassword, newPassword }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            localStorage.setItem('admin_access', data.data.accessToken);
            dispatch(setTokens({ accessToken: data.data.accessToken }));
          }
        } catch {}
      }
    }),
    rotateAccessTokenGet: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: `/new-access-token?currentPassword=${encodeURIComponent(currentPassword)}&newPassword=${encodeURIComponent(newPassword)}`,
        method: 'GET'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            localStorage.setItem('admin_access', data.data.accessToken);
            dispatch(setTokens({ accessToken: data.data.accessToken }));
          }
        } catch {}
      }
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: '/token/password-reset/req',
        method: 'POST',
        body: { email }
      })
    }),
    validatePasswordResetToken: builder.mutation({
      query: ({ token }) => ({
        url: '/token/password-reset/validate',
        method: 'POST',
        body: { token }
      })
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: '/token/reset-password',
        method: 'POST',
        body: { token, newPassword }
      })
    }),
    logoutVoid: builder.mutation({
      queryFn: () => ({ data: {} }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(adminLogout());
      }
    })
  })
});

export const {
  useAdminSigninMutation,
  useRotateAccessTokenMutation,
  useRequestPasswordResetMutation,
  useValidatePasswordResetTokenMutation,
  useResetPasswordMutation,
  useLogoutVoidMutation,
  useRotateAccessTokenGetMutation
} = authApi;