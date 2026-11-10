import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '@/stores/auth-store'
import { ApiError } from '@/lib/api/api-error'
import { authApi } from '../api/auth-api'
import { authService } from './auth-service'

// The API layer is replaced by fakes, so no server is needed.
vi.mock('../api/auth-api', () => ({
  authApi: {
    refresh: vi.fn(),
    me: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
  },
}))

const user = {
  id: '1',
  name: 'Ann',
  email: 'ann@example.com',
  roles: ['treasury'],
}

describe('authService.restoreSession', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.getState().clearSession()
  })

  it('rebuilds the session from the refresh cookie and /me', async () => {
    vi.mocked(authApi.refresh).mockResolvedValue({ accessToken: 'new-token' })
    vi.mocked(authApi.me).mockResolvedValue({
      user,
      permissions: ['loan:view'],
    })

    const restored = await authService.restoreSession()

    expect(restored).toBe(true)
    const state = useAuthStore.getState()
    expect(state.user).toEqual(user)
    expect(state.accessToken).toBe('new-token')
    expect(state.permissions).toEqual(['loan:view'])
  })

  it('returns false and stays logged out when there is no session', async () => {
    vi.mocked(authApi.refresh).mockRejectedValue(
      new ApiError(401, [{ message: 'No refresh token provided' }]),
    )

    const restored = await authService.restoreSession()

    expect(restored).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
    expect(authApi.me).not.toHaveBeenCalled()
  })

  it('shares one request when several callers restore at the same time', async () => {
    vi.mocked(authApi.refresh).mockResolvedValue({ accessToken: 't' })
    vi.mocked(authApi.me).mockResolvedValue({ user, permissions: [] })

    await Promise.all([
      authService.restoreSession(),
      authService.restoreSession(),
    ])

    expect(authApi.refresh).toHaveBeenCalledTimes(1)
  })
})
