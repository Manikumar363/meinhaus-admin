import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Safe resolve of base URL across Vite (VITE_API_URL) and CRA (REACT_APP_API_URL)
const viteEnv =
  typeof import.meta !== 'undefined' &&
  import.meta &&
  import.meta.env &&
  import.meta.env.VITE_API_URL;

const BASE_URL =
  viteEnv ||
  import.meta.env.VITE_API_URL ||
  'https://meinhouse-backend.onrender.com'; // final fallback

export const staticPagesApi = createApi({
  reducerPath: 'staticPagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['StaticPage'],
  endpoints: (builder) => ({
    // GET all pages
    getPages: builder.query({
      query: () => ({
        url: '/api/v1/static_pages', // adjust if backend differs
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data?.pages
          ? [
              ...result.data.pages.map((p) => ({
                type: 'StaticPage',
                id: p._id,
              })),
              { type: 'StaticPage', id: 'LIST' },
            ]
          : [{ type: 'StaticPage', id: 'LIST' }],
    }),

    // GET single page
    getPageById: builder.query({
      query: (id) => ({
        url: `/api/v1/static_pages/${id}`,
        method: 'GET',
      }),
      providesTags: (r, e, id) => [{ type: 'StaticPage', id }],
    }),

    // UPDATE page
    updatePages: builder.mutation({
      query: ({ id, page }) => ({
        url: `/api/v1/static_pages/${id}`,
        method: 'PUT',
        body: page,
      }),
      invalidatesTags: (r, e, { id }) => [
        { type: 'StaticPage', id },
        { type: 'StaticPage', id: 'LIST' },
      ],
    }),

    // CREATE page
    createPage: builder.mutation({
      query: (page) => ({
        url: '/api/v1/static_pages',
        method: 'POST',
        body: page,
      }),
      invalidatesTags: [{ type: 'StaticPage', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPagesQuery,
  useGetPageByIdQuery,
  useUpdatePagesMutation,
  useCreatePageMutation,
} = staticPagesApi;

export default staticPagesApi;