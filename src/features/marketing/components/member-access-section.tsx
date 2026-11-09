import { ShieldCheck } from 'lucide-react'
import { accessSteps } from '../data/marketing-content'

export function MemberAccessSection() {
  return (
    <section className="border-y bg-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:px-10">
        <div>
          <ShieldCheck className="mb-5 h-8 w-8 text-primary" />
          <h2 className="font-display text-3xl font-bold">
            Our group.
            <br />
            Our own records.
          </h2>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            Only our members get accounts. The group admin creates each
            member&apos;s login and sends them a secure invitation.
          </p>
        </div>
        <ol className="space-y-6">
          {accessSteps.map((step, index) => (
            <li key={step} className="flex gap-5 border-b pb-5">
              <span className="font-mono text-primary">0{index + 1}</span>
              <span className="font-medium">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
