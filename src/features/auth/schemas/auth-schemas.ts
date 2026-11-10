import { z } from 'zod'

// Rules for the login form. The server still validates everything,
// these checks give the user feedback before a request is sent.
const emailField = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .max(254, 'Email must be 254 characters or fewer')
  .pipe(z.email('Enter a valid email address'))

export const loginSchema = z.object({
  email: emailField,
  // Login only checks that a password was typed. Strength rules belong to
  // registration, which must match the server's RegisterDto (min 8 characters).
  password: z.string().min(1, 'Password is required'),
})

export const resetPasswordSchema = z.object({
  email: emailField,
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
