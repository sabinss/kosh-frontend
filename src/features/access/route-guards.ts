import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { authService } from '@/features/auth/services/auth-service'
import { hasPermission } from './has-permission'
import type { PermissionCode } from './permission-codes'

// Runs before a protected page renders (TanStack Router `beforeLoad`).
// If there is no session, it tries to restore one from the refresh cookie
// (this is what makes a page reload keep the user logged in).
// If that fails, the user is sent to sign-in.
export async function requireSession() {
  const { user } = useAuthStore.getState()
  if (user) return

  const restored = await authService.restoreSession()
  if (!restored) {
    throw redirect({ to: '/auth/sign-in' })
  }
}

// Use after requireSession. Sends the user to /dashboard when they lack the permission.
export function requirePermission(code: PermissionCode) {
  return () => {
    const { permissions } = useAuthStore.getState()
    if (!hasPermission(permissions, code)) {
      throw redirect({ to: '/dashboard' })
    }
  }
}
