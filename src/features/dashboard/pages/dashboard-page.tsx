import type { ComponentType } from 'react'
import { getPrimaryRole } from '@/features/access/role-home'
import type { DashboardRole } from '@/features/access/role-home'
import { useAuthStore } from '@/stores/auth-store'
import { MemberDashboard } from './member-dashboard'
import { PresidentDashboard } from './president-dashboard'
import { SuperAdminDashboard } from './super-admin-dashboard'
import { TreasuryDashboard } from './treasury-dashboard'

// Role -> dashboard page. Adding a role means one line here and one page.
const PAGE_BY_ROLE: Record<DashboardRole, ComponentType> = {
  super_admin: SuperAdminDashboard,
  president: PresidentDashboard,
  treasury: TreasuryDashboard,
  member: MemberDashboard,
}

function NoRoleDashboard() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-foreground">
        No role assigned
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Ask an administrator to give you a role.
      </p>
    </main>
  )
}

// Picks the page from the user's primary role.
export function DashboardPage() {
  // Select the stable user object, not a new array (a fresh [] on each call loops forever).
  const user = useAuthStore((state) => state.user)
  const primaryRole = getPrimaryRole(user?.roles ?? [])

  if (!primaryRole) return <NoRoleDashboard />

  const Page = PAGE_BY_ROLE[primaryRole]
  return <Page />
}
