import { describe, expect, it } from 'vitest'
import { getPrimaryRole } from './role-home'
import { hasPermission } from './has-permission'

describe('getPrimaryRole', () => {
  it('returns the single known role', () => {
    expect(getPrimaryRole(['treasury'])).toBe('treasury')
  })

  it('picks the most powerful role when a user has several', () => {
    expect(getPrimaryRole(['member', 'president'])).toBe('president')
    expect(getPrimaryRole(['treasury', 'super_admin'])).toBe('super_admin')
  })

  it('returns null when no known role is present', () => {
    expect(getPrimaryRole([])).toBeNull()
    expect(getPrimaryRole(['auditor'])).toBeNull()
  })
})

describe('hasPermission', () => {
  it('is true only for codes the user has', () => {
    const permissions = ['loan:view', 'loan:approve']
    expect(hasPermission(permissions, 'loan:approve')).toBe(true)
    expect(hasPermission(permissions, 'ledger:post')).toBe(false)
  })

  it('is false for an empty permission list', () => {
    expect(hasPermission([], 'loan:view')).toBe(false)
  })
})
