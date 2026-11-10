import { Outlet, createFileRoute } from '@tanstack/react-router'
import { requireSession } from '@/features/access/route-guards'

// Pathless layout route: adds no URL segment. Every page inside
// routes/_authenticated/ runs requireSession() before it renders.
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: requireSession,
  component: Outlet,
})
