// Small reusable pieces for the dashboards. Plain Tailwind, no logic.
import type { ReactNode } from 'react'

type StatCardProps = {
  label: string
  value: string
  hint?: string
  tone?: 'default' | 'danger' | 'success'
}

export function StatCard({
  label,
  value,
  hint,
  tone = 'default',
}: StatCardProps) {
  const valueClass =
    tone === 'danger'
      ? 'text-red-600'
      : tone === 'success'
        ? 'text-emerald-700'
        : 'text-slate-900'
  const dotClass =
    tone === 'danger'
      ? 'bg-red-500'
      : tone === 'success'
        ? 'bg-emerald-600'
        : 'bg-slate-400'

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
        <span
          className={`size-2 rounded-full ${dotClass}`}
          aria-hidden="true"
        />
        {label}
      </p>
      <p className={`mt-3 font-mono text-3xl font-semibold ${valueClass}`}>
        {value}
      </p>
      {hint && <p className="mt-2 text-sm text-slate-600">{hint}</p>}
    </div>
  )
}

export function SectionCard({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

type Tone = 'neutral' | 'success' | 'danger' | 'warning'

const pillClass: Record<Tone, string> = {
  neutral: 'border-slate-200 bg-slate-100 text-slate-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  danger: 'border-red-200 bg-red-50 text-red-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
}

export function StatusPill({
  tone,
  children,
}: {
  tone: Tone
  children: ReactNode
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${pillClass[tone]}`}
    >
      {children}
    </span>
  )
}

// Red bar while short, green once matched.
export function ProgressBar({
  percent,
  matched,
}: {
  percent: number
  matched: boolean
}) {
  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-stone-200"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${matched ? 'bg-emerald-600' : 'bg-red-500'}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
