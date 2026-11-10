import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000, // how long fetched data is considered fresh
      refetchOnWindowFocus: false,
    },
  },
})
