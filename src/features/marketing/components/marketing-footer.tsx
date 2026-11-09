import { Link } from '@tanstack/react-router'

export function MarketingFooter() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:px-10">
      <span className="font-display font-bold text-primary">
        Jagaran Youth Saving
      </span>
      <span>Built around our group&apos;s trust.</span>
      <Link to="/auth/sign-in" className="font-semibold text-primary">
        Member login →
      </Link>
    </footer>
  )
}
