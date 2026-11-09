import { useNavigate } from '@tanstack/react-router'
import { FiLogIn } from 'react-icons/fi'
import { Button } from '@/components/ui/button'

type AccountNavProps = {
  showUpArrow?: boolean
}

export function AccountNav({ showUpArrow = false }: AccountNavProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-2">
      <Button
        showUpArrow={showUpArrow}
        onClick={() => navigate({ to: '/auth/sign-in' })}
      >
        <FiLogIn className="size-4" aria-hidden="true" />
        Log in
      </Button>
    </div>
  )
}
