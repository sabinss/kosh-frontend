// Display helpers. The group is in Nepal, so dates use that time zone.
// Money uses Indian digit grouping: 2,05,800.

const TIME_ZONE = 'Asia/Kathmandu'

const amountFormat = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
})

export function formatRs(amount: number): string {
  return `Rs ${amountFormat.format(amount)}`
}

const meetingFormat = new Intl.DateTimeFormat('en-IN', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: TIME_ZONE,
})

export function formatMeetingDate(iso: string): string {
  return meetingFormat.format(new Date(iso))
}

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: TIME_ZONE,
})

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso))
}
