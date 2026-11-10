// Shapes the dashboards display. Sample data matches these now; when the
// API exists, its responses must match these types (or be mapped to them).

export type MeetingSchedule = {
  date: string // ISO date-time with timezone, e.g. 2026-12-05T15:00:00+05:45
  hostMember: string // member whose house hosts the meeting
  houseName: string
}

export type MeetingSummary = MeetingSchedule & {
  attendancePresent: number
  attendanceTotal: number
  agenda: string[]
  totalCollection: number
}

export type CollectionData = {
  monthLabel: string // e.g. "November 2026"
  expected: number // members x contribution per member
  collected: number // what the treasury has recorded so far
}

export type LoanRow = {
  id: string // loan code, e.g. LN-0015
  memberName: string
  principal: number
  balance: number // still to repay
  interestRatePercent: number // per month
  interestDue: number // balance x rate, this month
}

export type InstallmentRow = {
  id: string
  memberName: string
  loanCode: string
  installmentNo: number
  dueDate: string // ISO date
  amountDue: number
  status: 'partial' | 'overdue'
}

export type RoleSummary = {
  name: string
  description: string
  permissionCount: number
  memberCount: number
}

export type SuperAdminData = {
  totalMembers: number
  activeLoans: number
  groupSavings: number
  roles: RoleSummary[]
}

export type PresidentData = {
  userName: string
  activeMembers: number
  activeLoans: number
  groupSavings: number
  nextMeeting: MeetingSchedule
  lastMeeting: MeetingSummary
  collection: CollectionData
  loans: LoanRow[]
}

export type TreasuryData = {
  userName: string
  collection: CollectionData
  loans: LoanRow[]
  overdue: InstallmentRow[]
  groupSavings: number
}

export type MemberData = {
  userName: string
  activeMembers: number
  groupSavings: number
  contributionDue: number // this member's monthly amount
  loan: LoanRow | null // this member's own loan, if any
  nextMeeting: MeetingSchedule
}
