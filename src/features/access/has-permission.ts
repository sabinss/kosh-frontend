import type { PermissionCode } from './permission-codes'

// Pure check, no React: easy to test and reused by hooks and route guards.
export function hasPermission(
  permissions: readonly string[],
  code: PermissionCode,
): boolean {
  return permissions.includes(code)
}
