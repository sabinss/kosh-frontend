// Pure business rules for the dashboards. No React, so they are easy to test.

export type CollectionStatus = 'matched' | 'short'

// Everyone pays the same amount, so expected = members x amount.
export function expectedCollection(
  memberCount: number,
  amountPerMember: number,
): number {
  return memberCount * amountPerMember
}

// Red ("short") until collected reaches expected. Then it is "matched".
export function collectionProgress(expected: number, collected: number) {
  const status: CollectionStatus = collected >= expected ? 'matched' : 'short'
  const shortfall = Math.max(0, expected - collected)
  const percent =
    expected === 0
      ? 100
      : Math.min(100, Math.round((collected / expected) * 100))
  return { status, shortfall, percent }
}

export function attendancePercent(present: number, total: number): number {
  return total === 0 ? 0 : Math.round((present / total) * 100)
}

// Monthly interest on the outstanding balance, e.g. 24,000 at 2% = 480.
export function monthlyInterest(balance: number, ratePercent: number): number {
  return Math.round((balance * ratePercent) / 100)
}
