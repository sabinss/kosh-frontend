import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authService } from '../services/auth-service'

// React glue for login: the view calls this hook and stays free of API details.
export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: () => {
      // Land on the (sample) dashboard after login
      navigate({ to: '/dashboard' })
    },
  })
}
