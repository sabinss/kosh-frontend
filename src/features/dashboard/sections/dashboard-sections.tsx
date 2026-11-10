// Dashboard cards. Each card checks its own permission (useCan), so a page can
// include any card and the card decides whether to show. Pages stay simple.
import { useCan } from '@/features/access/use-can'
import type { PermissionCode } from '@/features/access/permission-codes'
import {
  ProgressBar,
  SectionCard,
  StatCard,
  StatusPill,
} from '../components/ui'
import { attendancePercent, collectionProgress } from '../lib/calculations'
import { formatDate, formatMeetingDate, formatRs } from '../lib/format'
import type {
  CollectionData,
  InstallmentRow,
  LoanRow,
  MeetingSchedule,
  MeetingSummary,
  RoleSummary,
} from '../types/dashboard.types'

// A stat card that is hidden when the user lacks the permission.
export function GatedStat({
  permission,
  label,
  value,
  hint,
  tone,
}: {
  permission: PermissionCode
  label: string
  value: string
  hint?: string
  tone?: 'default' | 'danger' | 'success'
}) {
  const allowed = useCan(permission)
  if (!allowed) return null
  return <StatCard label={label} value={value} hint={hint} tone={tone} />
}

export function NextMeetingCard({ meeting }: { meeting: MeetingSchedule }) {
  const allowed = useCan('meeting:view')
  if (!allowed) return null
  return (
    <SectionCard title="Next meeting">
      <p className="text-2xl font-semibold text-slate-900">
        {formatMeetingDate(meeting.date)}
      </p>
      <p className="mt-3 text-sm text-slate-700">
        Host: <span className="font-medium">{meeting.hostMember}</span>
      </p>
      <p className="text-sm text-slate-700">House: {meeting.houseName}</p>
    </SectionCard>
  )
}

export function MeetingSummaryCard({ summary }: { summary: MeetingSummary }) {
  const allowed = useCan('meeting:view')
  if (!allowed) return null
  const percent = attendancePercent(
    summary.attendancePresent,
    summary.attendanceTotal,
  )
  return (
    <SectionCard title="Last meeting summary">
      <p className="text-sm text-slate-600">
        {formatMeetingDate(summary.date)}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-slate-500">Attendance</p>
          <p className="font-mono text-2xl font-semibold text-slate-900">
            {percent}%
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Present</p>
          <p className="font-mono text-2xl font-semibold text-slate-900">
            {summary.attendancePresent}/{summary.attendanceTotal}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Collected</p>
          <p className="font-mono text-2xl font-semibold text-slate-900">
            {formatRs(summary.totalCollection)}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
        Agenda
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
        {summary.agenda.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-slate-700">
        Hosted by <span className="font-medium">{summary.hostMember}</span> ·{' '}
        {summary.houseName}
      </p>
    </SectionCard>
  )
}

export function CollectionCard({ collection }: { collection: CollectionData }) {
  const allowed = useCan('ledger:view')
  if (!allowed) return null
  const { status, shortfall, percent } = collectionProgress(
    collection.expected,
    collection.collected,
  )
  const matched = status === 'matched'

  return (
    <SectionCard title={`Collection · ${collection.monthLabel}`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-3xl font-semibold text-slate-900">
            {formatRs(collection.collected)}
          </p>
          <p className="text-sm text-slate-600">
            of {formatRs(collection.expected)} expected
          </p>
        </div>
        <StatusPill tone={matched ? 'success' : 'danger'}>
          {matched ? 'Matched' : `Short by ${formatRs(shortfall)}`}
        </StatusPill>
      </div>
      <div className="mt-4">
        <ProgressBar percent={percent} matched={matched} />
        <p className="mt-2 text-right text-xs text-slate-500">
          {percent}% collected
        </p>
      </div>
    </SectionCard>
  )
}

export function LoansCard({ loans }: { loans: LoanRow[] }) {
  const allowed = useCan('loan:view')
  if (!allowed) return null
  return (
    <SectionCard title="Active loans">
      <ul className="divide-y divide-stone-200">
        {loans.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between gap-4 py-3"
          >
            <div>
              <p className="font-medium text-slate-900">{row.memberName}</p>
              <p className="text-xs text-slate-500">
                {row.id} · {row.interestRatePercent}% per month
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-slate-900">
                Balance {formatRs(row.balance)}
              </p>
              <p className="font-mono text-sm font-semibold text-amber-700">
                Interest {formatRs(row.interestDue)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}

export function OverdueCard({ items }: { items: InstallmentRow[] }) {
  const allowed = useCan('loan:record_payment')
  if (!allowed) return null
  return (
    <SectionCard title="Overdue and partial installments">
      {items.length === 0 ? (
        <p className="text-sm text-slate-600">Nothing overdue.</p>
      ) : (
        <ul className="divide-y divide-stone-200">
          {items.map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div>
                <p className="font-medium text-slate-900">{row.memberName}</p>
                <p className="text-xs text-slate-500">
                  {row.loanCode} · #{row.installmentNo} due{' '}
                  {formatDate(row.dueDate)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-slate-900">
                  {formatRs(row.amountDue)}
                </span>
                <StatusPill
                  tone={row.status === 'overdue' ? 'danger' : 'warning'}
                >
                  {row.status === 'overdue' ? 'Overdue' : 'Partial'}
                </StatusPill>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}

// Own data only, so no permission check here.
export function MemberContributionCard({
  contributionDue,
  loan,
}: {
  contributionDue: number
  loan: LoanRow | null
}) {
  return (
    <SectionCard title="Your payments">
      <p className="text-sm text-slate-600">Contribution this month</p>
      <p className="font-mono text-3xl font-semibold text-slate-900">
        {formatRs(contributionDue)}
      </p>

      <div className="mt-5 border-t border-stone-200 pt-4">
        {loan ? (
          <>
            <p className="text-sm text-slate-600">Your loan {loan.id}</p>
            <p className="mt-1 font-mono text-sm text-slate-900">
              Balance {formatRs(loan.balance)}
            </p>
            <p className="font-mono text-sm font-semibold text-amber-700">
              Interest to pay this month {formatRs(loan.interestDue)}
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-600">You have no active loan.</p>
        )}
      </div>
    </SectionCard>
  )
}

// Super admin: create roles and assign permissions. Creating is a placeholder for now.
export function RolesCard({ roles }: { roles: RoleSummary[] }) {
  const allowed = useCan('user:assign_role')
  if (!allowed) return null
  return (
    <SectionCard
      title="Roles and permissions"
      action={
        <button
          type="button"
          disabled
          title="Coming soon"
          className="rounded-xl bg-teal-800 px-3 py-1.5 text-sm font-medium text-white opacity-50"
        >
          Create role
        </button>
      }
    >
      <ul className="divide-y divide-stone-200">
        {roles.map((role) => (
          <li
            key={role.name}
            className="flex items-center justify-between gap-4 py-3"
          >
            <div>
              <p className="font-mono text-sm font-medium text-slate-900">
                {role.name}
              </p>
              <p className="text-xs text-slate-500">{role.description}</p>
            </div>
            <div className="text-right text-xs text-slate-600">
              <p>{role.permissionCount} permissions</p>
              <p>{role.memberCount} users</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
