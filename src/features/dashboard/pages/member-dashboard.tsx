// Member: my contribution and loan, total members, group savings, next meeting.
import { DashboardShell } from '../components/dashboard-shell'
import { useMemberDashboard } from '../data/dashboard-queries'
import { formatRs } from '../lib/format'
import { MEMBER_NAV } from '../layouts/nav-items'
import {
  GatedStat,
  MemberContributionCard,
  NextMeetingCard,
} from '../sections/dashboard-sections'

export function MemberDashboard() {
  const { data } = useMemberDashboard()
  if (!data) return null

  return (
    <DashboardShell
      roleLabel="Member"
      greeting={`Namaste, ${data.userName}`}
      subtitle="Your contributions and the group's progress"
      navItems={MEMBER_NAV}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <GatedStat
          permission="member:view"
          label="Active members"
          value={String(data.activeMembers)}
        />
        <GatedStat
          permission="ledger:view"
          label="Total group savings"
          value={formatRs(data.groupSavings)}
          hint="Saved so far"
          tone="success"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <MemberContributionCard
          contributionDue={data.contributionDue}
          loan={data.loan}
        />
        <NextMeetingCard meeting={data.nextMeeting} />
      </div>
    </DashboardShell>
  )
}
