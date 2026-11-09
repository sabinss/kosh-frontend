import { useState } from 'react'
import { SignInForm } from '../components/sign-in-form'

export function SignInPage() {
  const [isResetMode, setIsResetMode] = useState(false)

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <p className="mb-3 text-sm font-semibold text-primary">Welcome back</p>
      <h1 className="font-display text-3xl font-bold">
        {isResetMode ? 'Reset your password' : 'Log in to Jagaran Youth Saving'}
      </h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Accounts are provided by the group admin. Use the email address on your
        invitation.
      </p>

      <SignInForm
        isResetMode={isResetMode}
        onToggleMode={() => setIsResetMode((current) => !current)}
      />
    </main>
  )
}
