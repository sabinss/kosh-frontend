// Super admin: overview numbers, plus the roles and permissions panel.
import { useAuthStore } from '@/stores/auth-store'
import { DashboardShell } from '../components/dashboard-shell'
import { StatCard } from '../components/ui'
import { useSuperAdminDashboard } from '../data/dashboard-queries'
import { RolesCard } from '../sections/dashboard-sections'
import { formatRs } from '../lib/format'
import { SUPER_ADMIN_NAV } from '../layouts/nav-items'

export function SuperAdminDashboard() {
  const user = useAuthStore((state) => state.user)
  const { data } = useSuperAdminDashboard()
  if (!data) return null

  return (
    <DashboardShell
      roleLabel="Super admin"
      greeting={`Namaste, ${user?.name.split(' ')[0] ?? ''}`}
      subtitle="Group overview"
      navItems={SUPER_ADMIN_NAV}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total members" value={String(data.totalMembers)} />
        <StatCard label="Active loans" value={String(data.activeLoans)} />
        <StatCard
          label="Group savings"
          value={formatRs(data.groupSavings)}
          tone="success"
        />
        <StatCard
          label="Roles"
          value={String(data.roles.length)}
          hint="Permissions set per role"
        />
      </div>

      <RolesCard roles={data.roles} />
    </DashboardShell>
  )
}
