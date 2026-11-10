// President: meetings (next date, last summary), collection status, loans with interest.
import { DashboardShell } from '../components/dashboard-shell'
import { usePresidentDashboard } from '../data/dashboard-queries'
import {
  CollectionCard,
  GatedStat,
  LoansCard,
  MeetingSummaryCard,
  NextMeetingCard,
} from '../sections/dashboard-sections'
import { formatDate, formatRs } from '../lib/format'
import { PRESIDENT_NAV } from '../layouts/nav-items'

export function PresidentDashboard() {
  const { data } = usePresidentDashboard()
  if (!data) return null

  return (
    <DashboardShell
      roleLabel="President"
      greeting={`Namaste, ${data.userName}`}
      subtitle="Monthly meeting and group health"
      navItems={PRESIDENT_NAV}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <GatedStat
          permission="member:view"
          label="Active members"
          value={String(data.activeMembers)}
        />
        <GatedStat
          permission="loan:view"
          label="Active loans"
          value={String(data.activeLoans)}
        />
        <GatedStat
          permission="ledger:view"
          label="Group savings"
          value={formatRs(data.groupSavings)}
          tone="success"
        />
        <GatedStat
          permission="meeting:view"
          label="Upcoming meeting"
          value={formatDate(data.nextMeeting.date)}
          hint="3:00 PM, first week of the month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <NextMeetingCard meeting={data.nextMeeting} />
        <MeetingSummaryCard summary={data.lastMeeting} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CollectionCard collection={data.collection} />
        <LoansCard loans={data.loans} />
      </div>
    </DashboardShell>
  )
}
