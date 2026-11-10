import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/auth-service'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Drop cached server data so the next user never sees the previous user's data
      queryClient.clear()
    },
  })
}
