import { describe, expect, it } from 'vitest'
import {
  attendancePercent,
  collectionProgress,
  expectedCollection,
  monthlyInterest,
} from './calculations'

describe('expectedCollection', () => {
  it('is members times the monthly amount', () => {
    expect(expectedCollection(20, 500)).toBe(10000)
  })
})

describe('collectionProgress', () => {
  it('is short (red) until collected reaches expected', () => {
    const result = collectionProgress(10000, 7500)
    expect(result).toEqual({ status: 'short', shortfall: 2500, percent: 75 })
  })

  it('is matched once collected equals expected', () => {
    expect(collectionProgress(10000, 10000)).toEqual({
      status: 'matched',
      shortfall: 0,
      percent: 100,
    })
  })

  it('caps the percent at 100 when more is collected', () => {
    const result = collectionProgress(10000, 12000)
    expect(result.status).toBe('matched')
    expect(result.percent).toBe(100)
  })
})

describe('attendancePercent', () => {
  it('rounds present over total', () => {
    expect(attendancePercent(17, 20)).toBe(85)
  })

  it('returns 0 when there are no members', () => {
    expect(attendancePercent(0, 0)).toBe(0)
  })
})

describe('monthlyInterest', () => {
  it('is balance times the monthly rate', () => {
    expect(monthlyInterest(24000, 2)).toBe(480)
  })
})
