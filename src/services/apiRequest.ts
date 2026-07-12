import { Amplify } from 'aws-amplify'
import { fetchAuthSession } from 'aws-amplify/auth'
import config from '../auth/config.ts'

/* eslint-disable @typescript-eslint/no-explicit-any */

Amplify.configure(config)

// ============================================
// Types — mirrors the shape of an axios response
// so call sites using `response.data` don't need to change.
// ============================================
export interface ApiResponse<T = any> {
  data: T
  status: number
  headers: Headers
}

export interface RequestConfig {
  headers?: Record<string, string>
  data?: any // used by delete() to pass a body, same as axios's { data: ... }
}

export class ApiError extends Error {
  status: number
  data: unknown
  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

// ============================================
// Auth — same session/token logic as before
// ============================================
async function fetchSessionToken() {
  const session = await fetchAuthSession()
  return session.tokens?.idToken?.toString()
}

async function getAuthHeaders(isFormData: boolean): Promise<Record<string, string>> {
  const sessionToken = await fetchSessionToken()
  const headers: Record<string, string> = {
    Authorization: `Bearer ${sessionToken}`,
  }
  // Note: Access-Control-Allow-* headers were dropped intentionally —
  // those are response headers set by the server, not request headers.
  // Setting them on the client request is a no-op and browsers may
  // strip/ignore them anyway.
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}

// ============================================
// Core request function — the ONLY place fetch,
// headers, and error handling are defined.
// ============================================
async function request<T = any>(
  method: string,
  url: string,
  body?: any,
  requestConfig: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const isFormData = body instanceof FormData
  const authHeaders = await getAuthHeaders(isFormData)

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...authHeaders,
      ...requestConfig.headers, // allows per-call overrides, same as axios
    },
  }

  if (body !== undefined) {
    fetchOptions.body = isFormData ? body : JSON.stringify(body)
  }

  let response: Response
  try {
    response = await fetch(url, fetchOptions)
  } catch (networkError: any) {
    // fetch() only throws on actual network failure (offline, DNS, CORS block, etc.)
    throw new ApiError(
      `Network error on ${method} ${url}: ${networkError.message}`,
      0,
      null
    )
  }

  // Parse body once, regardless of success/failure, so error responses
  // with a JSON error message are still readable by the caller.
  let data: unknown = null
  if (response.status !== 204) {
    const text = await response.text()
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text // not JSON — return as raw text
    }
  }

  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status} on ${method} ${url}`, response.status, data)
  }

  return { data: data as T, status: response.status, headers: response.headers }
}

// ============================================
// apiRequest — axios-like public interface
// ============================================
export const apiRequest = {
  get: <T = any>(url: string, requestConfig?: RequestConfig) =>
    request<T>('GET', url, undefined, requestConfig),

  post: <T = any>(url: string, body?: any, requestConfig?: RequestConfig) =>
    request<T>('POST', url, body, requestConfig),

  put: <T = any>(url: string, body?: any, requestConfig?: RequestConfig) =>
    request<T>('PUT', url, body, requestConfig),

  // matches axios's delete(url, { data, headers }) signature
  delete: <T = any>(url: string, requestConfig?: RequestConfig) =>
    request<T>('DELETE', url, requestConfig?.data, requestConfig),
}
