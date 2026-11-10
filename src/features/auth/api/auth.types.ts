// Shapes that match the server (server/src/modules/auth and users/user.service.ts)

export type AuthUser = {
  id: string
  name: string
  email: string
  roles: string[]
}

export type LoginRequest = {
  email: string
  password: string
}

// Web clients get the refresh token as a cookie, so it is not in this body.
export type LoginResponse = {
  user: AuthUser
  permissions: string[]
  accessToken: string
}

export type RefreshResponse = {
  accessToken: string
}

// GET /auth/me: the profile used to rebuild the session after a reload.
export type MeResponse = {
  user: AuthUser
  permissions: string[]
}
