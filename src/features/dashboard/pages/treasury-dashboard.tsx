// Treasury: collection progress, what is still owed, overdue installments, loans.
import { DashboardShell } from '../components/dashboard-shell'
import { useTreasuryDashboard } from '../data/dashboard-queries'
import { collectionProgress } from '../lib/calculations'
import { formatRs } from '../lib/format'
import { TREASURY_NAV } from '../layouts/nav-items'
import {
  CollectionCard,
  GatedStat,
  LoansCard,
  OverdueCard,
} from '../sections/dashboard-sections'

export function TreasuryDashboard() {
  const { data } = useTreasuryDashboard()
  if (!data) return null

  const { shortfall } = collectionProgress(
    data.collection.expected,
    data.collection.collected,
  )

  return (
    <DashboardShell
      roleLabel="Treasury"
      greeting={`Namaste, ${data.userName}`}
      subtitle={`${data.collection.monthLabel} collection`}
      navItems={TREASURY_NAV}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <GatedStat
          permission="ledger:view"
          label="Expected this month"
          value={formatRs(data.collection.expected)}
          hint="Members x monthly contribution"
        />
        <GatedStat
          permission="ledger:view"
          label="Collected"
          value={formatRs(data.collection.collected)}
          tone={shortfall === 0 ? 'success' : 'danger'}
        />
        <GatedStat
          permission="ledger:view"
          label="Still to collect"
          value={formatRs(shortfall)}
          tone={shortfall === 0 ? 'success' : 'danger'}
        />
        <GatedStat
          permission="ledger:view"
          label="Group savings"
          value={formatRs(data.groupSavings)}
          tone="success"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CollectionCard collection={data.collection} />
        <OverdueCard items={data.overdue} />
      </div>

      <LoansCard loans={data.loans} />
    </DashboardShell>
  )
}
