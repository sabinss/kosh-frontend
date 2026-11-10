// Shared frame for every role dashboard: sidebar on the left, content on the right.
// The sidebar collapses into a scrollable row on phones.
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export type NavItem = { label: string; icon: LucideIcon; to: string }

type DashboardShellProps = {
  roleLabel: string
  greeting: string
  subtitle: string
  navItems: NavItem[]
  action?: ReactNode
  children: ReactNode
}

export function DashboardShell({
  roleLabel,
  greeting,
  subtitle,
  navItems,
  action,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <aside className="border-b border-stone-200 bg-stone-100/70 px-4 py-4 md:w-60 md:shrink-0 md:border-r md:border-b-0 md:px-5 md:py-6">
        <p className="text-lg font-extrabold text-teal-800">
          Jagaran <span className="text-slate-900">Youth Saving</span>
        </p>
        <p className="text-xs text-slate-600">Friends saving group</p>

        <nav
          aria-label="Main"
          className="mt-4 flex gap-2 overflow-x-auto md:mt-8 md:flex-col md:overflow-visible"
        >
          {navItems.map((item, index) => {
            const Icon = item.icon
            const active = index === 0
            return (
              <Link to={item.to} key={item.label}>
                <span
                  key={item.label}
                  aria-current={active ? 'page' : undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${active
                    ? 'bg-teal-800 text-white'
                    : 'text-slate-700 hover:bg-stone-200'
                    }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 px-4 py-6 md:px-10 md:py-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">
              {roleLabel}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              {greeting}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          </div>
          {action}
        </header>

        <div className="mt-6 space-y-6">{children}</div>
      </main>
    </div>
  )
}
