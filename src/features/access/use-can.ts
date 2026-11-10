import { useAuthStore } from '@/stores/auth-store'
import { hasPermission } from './has-permission'
import type { PermissionCode } from './permission-codes'

// Components ask "can I?" through this hook, never by reading roles.
// Usage: const canApprove = useCan('loan:approve')
export function useCan(code: PermissionCode): boolean {
  return useAuthStore((state) => hasPermission(state.permissions, code))
}
