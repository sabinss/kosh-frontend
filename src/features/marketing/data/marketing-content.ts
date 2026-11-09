import {
  BookOpen,
  CalendarCheck,
  FileBarChart,
  Landmark,
  NotebookPen,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type FeatureItem = {
  icon: LucideIcon
  title: string
  text: string
}

export const highlights = [
  'Separate principal & interest',
  'Officer action history',
  'Every member can see the records',
] as const

export const features: FeatureItem[] = [
  {
    icon: CalendarCheck,
    title: 'Meeting management',
    text: 'Attendance, monthly dues and repayments. Keep every meeting organized from collection to cash reconciliation.',
  },
  {
    icon: BookOpen,
    title: 'Member ledgers',
    text: 'A clear record for each member, with principal and approved interest shown separately and corrections kept traceable.',
  },
  {
    icon: Users,
    title: 'Member tracking',
    text: 'Keep member and family details together, alongside savings, dues and outstanding payments.',
  },
  {
    icon: Landmark,
    title: 'Loan tracking',
    text: 'Follow approved repayment schedules, outstanding principal and overdue installments in one place.',
  },
  {
    icon: FileBarChart,
    title: 'Reports',
    text: "Review collections, savings and loan balances, and download statements for your group's records.",
  },
  {
    icon: NotebookPen,
    title: 'Day book',
    text: 'Daily cash-in and cash-out records are planned for the live financial workspace.',
  },
]

export const accessSteps = [
  'The admin adds a member to the group.',
  'The member receives an invitation and sets a password.',
  'The member signs in to see savings, loans and meetings.',
] as const
