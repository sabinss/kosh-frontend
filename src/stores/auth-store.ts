import { create } from 'zustand'
import type { AuthUser } from '@/features/auth/api/auth.types'

// Session state lives in memory only. The refresh token is an httpOnly cookie,
// so JavaScript never stores a long-lived secret in localStorage.
// After a page reload this state is empty; requireSession() restores it.
type AuthState = {
  user: AuthUser | null
  accessToken: string | null
  permissions: string[]
  setSession: (session: {
    user: AuthUser
    accessToken: string
    permissions: string[]
  }) => void
  setAccessToken: (accessToken: string) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,
  permissions: [],
  setSession: ({ user, accessToken, permissions }) =>
    set({ user, accessToken, permissions }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearSession: () => set({ user: null, accessToken: null, permissions: [] }),
}))
