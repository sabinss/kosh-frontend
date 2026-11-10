import { create } from 'zustand'

// Client-only UI state. Server data belongs in React Query, not here.
type UiState = {
  isMobileNavOpen: boolean
  setMobileNavOpen: (isOpen: boolean) => void
}

export const useUiStore = create<UiState>()((set) => ({
  isMobileNavOpen: false,
  setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
}))
