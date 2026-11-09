import { Link } from '@tanstack/react-router'
import { Landmark } from 'lucide-react'
import { AccountNav } from './account-nav'

export function PublicHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold text-teal-800"
        >
          <Landmark className="h-6 w-6 text-primary" />
          Jagaran
          <span className="text-slate-900"> Youth Saving</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/features"
            className="hidden text-sm font-semibold text-slate-700 sm:block text-secondary-foreground"
          >
            What we track
          </Link>
          <Link
            to="/mobile-preview"
            className="hidden text-sm font-semibold text-slate-700 sm:block"
          >
            Mobile app
          </Link>
          <AccountNav />
        </nav>
      </div>
    </header>
  )
}
