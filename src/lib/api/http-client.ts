import { ApiError } from './api-error'
import { useAuthStore } from '@/stores/auth-store'

// Every API call goes through /api. Vite forwards it to the server (see vite.config.ts),
// so the browser sees one origin and the httpOnly refresh cookie works.
const API_BASE_URL = '/api'

// The server wraps every success response as { success, message, data }.
type ApiSuccessBody<T> = {
  success: true
  message: string
  data: T
}

export type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown // plain object, converted to JSON for you
  skipAuth?: boolean // true for login/refresh, which must not send an old token
}

// The one place that talks to fetch. Feature API files call this function.
export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, skipAuth = false, ...init } = options

  const finalHeaders = new Headers(headers)
  if (body !== undefined) {
    finalHeaders.set('Content-Type', 'application/json')
  }

  if (!skipAuth) {
    // Read the token from the store outside React (plain function, not a hook)
    const accessToken = useAuthStore.getState().accessToken
    if (accessToken) {
      finalHeaders.set('Authorization', `Bearer ${accessToken}`)
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: finalHeaders,
    credentials: 'include', // send and receive the refresh cookie
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  // Non-JSON bodies (e.g. a proxy error page) become null instead of crashing
  const json: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    throw ApiError.fromResponse(response.status, json)
  }

  return (json as ApiSuccessBody<T>).data
}
