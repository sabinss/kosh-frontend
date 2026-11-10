// Roles that have a dashboard layout, most powerful first.
// If a user has several roles, the first match in this list wins.
export const ROLE_PRIORITY = [
  'super_admin',
  'president',
  'treasury',
  'member',
] as const

export type DashboardRole = (typeof ROLE_PRIORITY)[number]

// Picks the role that decides the dashboard layout.
// Returns null when the user has none of the known roles.
export function getPrimaryRole(roles: readonly string[]): DashboardRole | null {
  return ROLE_PRIORITY.find((role) => roles.includes(role)) ?? null
}
