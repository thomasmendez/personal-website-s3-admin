import { Project } from './../types/projectTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { fetchAuthSession } from 'aws-amplify/auth'

export const baseUrl = import.meta.env.VITE_PERSONAL_WEBSITE_SERVICE

async function fetchSessionToken() {
  const session = await fetchAuthSession();
  const sessionToken = session.tokens?.idToken?.toString()
  return sessionToken
}

const baseQueryWithHeaders = () =>
  fetchBaseQuery({
    baseUrl: baseUrl, // Update with your API base URL
    prepareHeaders: async (headers, { endpoint, method }) => {
      // Set common headers
      const sessionToken = await fetchSessionToken()
      headers.set('Authorization', `Bearer ${sessionToken}`)
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', '*')
      headers.set('Access-Control-Allow-Headers', '*')
      return headers
    },
  })

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: baseQueryWithHeaders(),
  keepUnusedDataFor: 30,
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/api/v1/projects',
      providesTags: ['Projects']
    }),
    createProjects: builder.mutation<Project, Partial<Project>>({
      query: (newProject) => ({
        url: '/api/v1/projects',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['Projects']
    }),
    updateProjects: builder.mutation<Project, Partial<Project>>({
      query: (updateProject) => ({
        url: '/api/v1/projects',
        method: 'PUT',
        body: updateProject,
      }),
      invalidatesTags: ['Projects']
    }),
    deleteProjects: builder.mutation<Project, Partial<Project>>({
      query: (deleteProject) => ({
        url: '/api/v1/projects',
        method: 'DELETE',
        body: deleteProject,
      }),
      invalidatesTags: ['Projects']
    })
  }),
})

export const {
    useGetProjectsQuery,
    useCreateProjectsMutation,
    useUpdateProjectsMutation,
    useDeleteProjectsMutation
} = projectsApi