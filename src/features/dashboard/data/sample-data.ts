// SAMPLE DATA ONLY. Used until the APIs exist. Each role has its own object,
// so you can replace one role's data without touching the others.
import { expectedCollection, monthlyInterest } from '../lib/calculations'
import type {
  InstallmentRow,
  LoanRow,
  MeetingSummary,
  MemberData,
  PresidentData,
  SuperAdminData,
  TreasuryData,
} from '../types/dashboard.types'

const CONTRIBUTION_PER_MEMBER = 500
const MEMBER_COUNT = 20

function loan(
  id: string,
  memberName: string,
  principal: number,
  balance: number,
  interestRatePercent: number,
): LoanRow {
  return {
    id,
    memberName,
    principal,
    balance,
    interestRatePercent,
    interestDue: monthlyInterest(balance, interestRatePercent),
  }
}

const gitaLoan = loan('LN-0024', 'Gita Adhikari', 12000, 12000, 2)

const loans: LoanRow[] = [
  loan('LN-0015', 'Bishnu Gurung', 30000, 24000, 2),
  loan('LN-0018', 'Sita Thapa', 20000, 15000, 2),
  loan('LN-0021', 'Ram Karki', 15000, 9000, 2),
  gitaLoan,
]

const GROUP_SAVINGS = 205800

const collection = {
  monthLabel: 'November 2026',
  expected: expectedCollection(MEMBER_COUNT, CONTRIBUTION_PER_MEMBER),
  collected: 7500, // short of 10,000, so the dashboard shows red
}

const lastMeeting: MeetingSummary = {
  date: '2026-11-05T15:00:00+05:45',
  hostMember: 'Gita Adhikari',
  houseName: "Gita's house, Ward 4",
  attendancePresent: 17,
  attendanceTotal: MEMBER_COUNT,
  agenda: [
    'Read last meeting minutes',
    'Review monthly collection',
    'Loan requests and repayments',
    'Plan for next month',
  ],
  totalCollection: 7500,
}

const nextMeeting = {
  date: '2026-12-05T15:00:00+05:45',
  hostMember: 'Sita Thapa',
  houseName: "Sita's house, Ward 2",
}

const overdue: InstallmentRow[] = [
  {
    id: 'inst-1',
    memberName: 'Bishnu Gurung',
    loanCode: 'LN-0015',
    installmentNo: 3,
    dueDate: '2026-09-15',
    amountDue: 2400,
    status: 'partial',
  },
  {
    id: 'inst-2',
    memberName: 'Ram Karki',
    loanCode: 'LN-0021',
    installmentNo: 2,
    dueDate: '2026-10-15',
    amountDue: 1000,
    status: 'overdue',
  },
]

export const superAdminSample: SuperAdminData = {
  totalMembers: MEMBER_COUNT,
  activeLoans: loans.length,
  groupSavings: GROUP_SAVINGS,
  roles: [
    {
      name: 'super_admin',
      description: 'Full system access',
      permissionCount: 21,
      memberCount: 1,
    },
    {
      name: 'president',
      description: 'Leads meetings, approves loans',
      permissionCount: 10,
      memberCount: 1,
    },
    {
      name: 'treasury',
      description: 'Handles money: collections, loans',
      permissionCount: 12,
      memberCount: 1,
    },
    {
      name: 'member',
      description: 'Ordinary member, read-only',
      permissionCount: 2,
      memberCount: 17,
    },
  ],
}

export const presidentSample: PresidentData = {
  userName: 'Ram',
  activeMembers: MEMBER_COUNT,
  activeLoans: loans.length,
  groupSavings: GROUP_SAVINGS,
  nextMeeting,
  lastMeeting,
  collection,
  loans,
}

export const treasurySample: TreasuryData = {
  userName: 'Sita',
  collection,
  loans,
  overdue,
  groupSavings: GROUP_SAVINGS,
}

export const memberSample: MemberData = {
  userName: 'Gita',
  activeMembers: MEMBER_COUNT,
  groupSavings: GROUP_SAVINGS,
  contributionDue: CONTRIBUTION_PER_MEMBER,
  loan: gitaLoan,
  nextMeeting,
}
