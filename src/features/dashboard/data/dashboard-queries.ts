// One hook per role dashboard. Components only call these hooks.
// TODO when the API exists: replace the queryFn with apiRequest<...>(...).
// Example: queryFn: () => apiRequest<PresidentData>('/dashboard/president')
import { useQuery } from '@tanstack/react-query'
import {
  memberSample,
  presidentSample,
  superAdminSample,
  treasurySample,
} from './sample-data'

export function useSuperAdminDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'super-admin'],
    queryFn: () => Promise.resolve(superAdminSample),
  })
}

export function usePresidentDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'president'],
    queryFn: () => Promise.resolve(presidentSample),
  })
}

export function useTreasuryDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'treasury'],
    queryFn: () => Promise.resolve(treasurySample),
  })
}

export function useMemberDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'member'],
    queryFn: () => Promise.resolve(memberSample),
  })
}
