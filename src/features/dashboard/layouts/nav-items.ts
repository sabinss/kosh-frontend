// Sidebar items per role. Labels only for now: the pages behind them do not exist yet.
import {
  Briefcase,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  Landmark,
  Scale,
  Settings,
  Shield,
  Users,
  Wallet,
} from 'lucide-react'
import type { NavItem } from '../components/dashboard-shell'

export const SUPER_ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Roles', icon: Shield, to: '/role' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export const PRESIDENT_NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Meeting', icon: CalendarCheck },
  { label: 'Loans', icon: Landmark },
  { label: 'Reports', icon: FileText },
]

export const TREASURY_NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Collection', icon: Wallet },
  { label: 'Reconcile', icon: Scale },
  { label: 'Loans', icon: Landmark },
  { label: 'Members', icon: Users },
  { label: 'Reports', icon: FileText },
]

export const MEMBER_NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Meeting', icon: CalendarCheck },
  { label: 'My loans', icon: Briefcase },
]
