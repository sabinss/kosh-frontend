import { useAuthStore } from '@/stores/auth-store'
import { ApiError } from '@/lib/api/api-error'
import { authApi } from '../api/auth-api'

// Two requests can start restoring at once (e.g. two guarded routes).
// They share one promise, so the refresh token is only rotated once.
let restoring: Promise<boolean> | null = null

// Business logic for auth. Components never call authApi or the store directly.
export const authService = {
  async login(email: string, password: string) {
    // Rule: emails are stored and compared in lowercase (the server does the same)
    const normalizedEmail = email.trim().toLowerCase()

    const session = await authApi.login({
      email: normalizedEmail,
      password,
    })

    useAuthStore.getState().setSession(session)
    return session.user
  },

  // Rebuilds the session from the refresh cookie. Returns false when the
  // user is not logged in (no cookie, or the session has ended).
  restoreSession(): Promise<boolean> {
    if (!restoring) {
      restoring = (async () => {
        try {
          const { accessToken } = await authApi.refresh()
          useAuthStore.getState().setAccessToken(accessToken)

          const { user, permissions } = await authApi.me()
          useAuthStore.getState().setSession({ user, accessToken, permissions })
          return true
        } catch (error) {
          // A missing or expired session is normal; anything else is worth knowing
          if (!(error instanceof ApiError)) console.error(error)
          useAuthStore.getState().clearSession()
          return false
        } finally {
          restoring = null
        }
      })()
    }
    return restoring
  },

  async logout() {
    try {
      await authApi.logout()
    } finally {
      // Clear local state even if the request failed, so the user is logged out here
      useAuthStore.getState().clearSession()
    }
  },
}
