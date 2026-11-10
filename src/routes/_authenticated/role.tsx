import { createFileRoute } from '@tanstack/react-router'
import RolePage from '@/features/roles/pages/role-page'

export const Route = createFileRoute('/_authenticated/role')({
    component: RolePage,
})
