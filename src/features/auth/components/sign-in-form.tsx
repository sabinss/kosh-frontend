import { LoginForm } from './login-form'
import { ResetPasswordForm } from './reset-password-form'

type SignInFormProps = {
  isResetMode: boolean
  onToggleMode: () => void
}

// Chooses which form to show. Each form has its own schema and state.
export function SignInForm({ isResetMode, onToggleMode }: SignInFormProps) {
  if (isResetMode) {
    return <ResetPasswordForm onBackToLogin={onToggleMode} />
  }
  return <LoginForm onForgotPassword={onToggleMode} />
}
