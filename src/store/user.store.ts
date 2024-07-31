import { User } from 'firebase/auth'
import { create } from 'zustand'

type UseType = User | null

interface UseTypeStore {
  user: UseType
  setUser: (user: UseType) => void
}

export const useUserStore = create<UseTypeStore>(set => ({
  user: null,
  setUser: (user: UseType) => set({ user }),
}))
