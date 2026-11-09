import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import meetingImage from '@/assets/community-meeting.jpg'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="marketing-hero relative isolate overflow-hidden">
      <img
        src={meetingImage}
        width={1600}
        height={912}
        alt="Our saving group recording its meeting together"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-right"
      />
      <div className="hero-scrim absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <p className="mb-6 text-sm font-semibold uppercase text-hero-foreground">
          Friends saving together
        </p>
        <h1 className="max-w-lg font-display text-5xl font-extrabold leading-tight text-hero-foreground md:text-6xl">
          Jagaran Youth Saving
        </h1>
        <p className="mt-5 max-w-md text-2xl font-medium leading-snug text-hero-foreground">
          Our savings.
          <br />
          Clear records. Shared trust.
        </p>
        <p className="mt-5 max-w-sm text-base leading-7 text-hero-foreground/85">
          We keep our meetings, members, savings and loan records together. Less
          paperwork. More confidence in every collection.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">
            Open the group workspace
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate({ to: '/auth/sign-in' })}
          >
            Member login
          </Button>
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-hero-foreground/80">
          <ShieldCheck className="h-4 w-4" />
          Accounts are given to members by our group admin.
        </p>
      </div>
    </section>
  )
}
