import { apiRequest } from '@/lib/api/http-client'
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
  RefreshResponse,
} from './auth.types'

// Raw endpoint calls only. No state, no business rules, no React.
export const authApi = {
  login: (body: LoginRequest) =>
    apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body,
      skipAuth: true,
    }),

  refresh: () =>
    apiRequest<RefreshResponse>('/auth/refresh', {
      method: 'POST',
      skipAuth: true,
    }),

  // Needs a valid access token (sent automatically by apiRequest)
  me: () => apiRequest<MeResponse>('/auth/me'),

  logout: () =>
    apiRequest<null>('/auth/logout', {
      method: 'POST',
      skipAuth: true,
    }),
}
