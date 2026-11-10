import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPasswordSchema } from '../schemas/auth-schemas'
import type { ResetPasswordFormValues } from '../schemas/auth-schemas'

type ResetPasswordFormProps = {
  onBackToLogin: () => void
}

export function ResetPasswordForm({ onBackToLogin }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  })

  return (
    <form
      className="mt-8 space-y-5"
      noValidate
      onSubmit={handleSubmit(() => {
        // TODO: call the password reset API once the server has one
      })}
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          maxLength={254}
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-secondary">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Send reset link
      </Button>
      <Button
        type="button"
        variant="link"
        className="w-full"
        onClick={onBackToLogin}
      >
        Back to login
      </Button>
    </form>
  )
}
