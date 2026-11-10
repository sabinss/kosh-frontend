import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { DashboardPage } from './dashboard-page'

// Permission lists copied from server/src/common/permissions/role-defaults.ts
const PRESIDENT_PERMISSIONS = [
  'meeting:view',
  'meeting:create',
  'meeting:update',
  'member:view',
  'loan:view',
  'loan:approve',
  'ledger:view',
  'report:view',
  'report:export',
  'daybook:view',
]
const TREASURY_PERMISSIONS = [
  'meeting:view',
  'member:view',
  'member:create',
  'member:update',
  'loan:view',
  'loan:create',
  'loan:record_payment',
  'ledger:view',
  'ledger:post',
  'report:view',
  'report:export',
  'daybook:view',
]
const MEMBER_PERMISSIONS = ['meeting:view', 'loan:view']

function loginAs(roles: string[], permissions: string[]) {
  useAuthStore.getState().setSession({
    user: { id: '1', name: 'Test User', email: 't@example.com', roles },
    accessToken: 'token',
    permissions,
  })
}

// The dashboards read data through react-query, so tests need a provider.
function renderPage() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={client}>
      <DashboardPage />
    </QueryClientProvider>,
  )
}

describe('DashboardPage', () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession()
  })

  it('shows the president dashboard with meeting and collection cards', async () => {
    loginAs(['president'], PRESIDENT_PERMISSIONS)
    renderPage()

    expect(await screen.findByText('President')).toBeTruthy()
    expect(screen.getByText('Next meeting')).toBeTruthy()
    expect(screen.getByText('Last meeting summary')).toBeTruthy()
    expect(screen.getByText(/Short by/)).toBeTruthy()
  })

  it('shows the treasury dashboard with collection and overdue, not roles', async () => {
    loginAs(['treasury'], TREASURY_PERMISSIONS)
    renderPage()

    expect(await screen.findByText('Treasury')).toBeTruthy()
    expect(screen.getByText('Overdue and partial installments')).toBeTruthy()
    expect(screen.queryByText('Roles and permissions')).toBeNull()
  })

  it('shows a member only their own payments and the next meeting', async () => {
    loginAs(['member'], MEMBER_PERMISSIONS)
    renderPage()

    expect(await screen.findByText('Your payments')).toBeTruthy()
    expect(screen.getByText('Next meeting')).toBeTruthy()
    expect(screen.queryByText('Collection')).toBeNull()
    expect(screen.queryByText('Overdue and partial installments')).toBeNull()
  })

  it('gives super admin the stats and the roles panel', async () => {
    loginAs(
      ['super_admin'],
      ['user:assign_role', 'ledger:view', 'loan:view', 'member:view'],
    )
    renderPage()

    expect(await screen.findByText('Super admin')).toBeTruthy()
    expect(screen.getByText('Roles and permissions')).toBeTruthy()
    expect(screen.getByText('Total members')).toBeTruthy()
  })

  it('shows the no-role message when the user has no known role', async () => {
    loginAs(['auditor'], [])
    renderPage()

    expect(
      await screen.findByRole('heading', { name: 'No role assigned' }),
    ).toBeTruthy()
  })
})
