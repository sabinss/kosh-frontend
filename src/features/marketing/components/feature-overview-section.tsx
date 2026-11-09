import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { features } from '../data/marketing-content'

export function FeatureOverviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-bold uppercase text-primary">
            One group. One clear picture.
          </p>
          <h2 className="font-display text-3xl font-bold">
            From meeting to member ledger.
          </h2>
        </div>
        <Link
          to="/features"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          See what we track
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <article key={feature.title} className="border-t py-6">
            <div className="mb-5 flex items-center justify-between">
              <feature.icon className="h-7 w-7 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">
                0{index + 1}
              </span>
            </div>
            <h3 className="mb-3 font-display text-xl font-bold">
              {feature.title}
            </h3>
            <p className="text-sm leading-7 text-muted-foreground">
              {feature.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
