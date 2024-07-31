import { create } from 'zustand'

type AuthStateTypes = 'login' | 'register'

interface IAuthStateStore {
  authState: AuthStateTypes
  setAuth: (state: AuthStateTypes) => void
}

export const useAuthState = create<IAuthStateStore>(set => ({
  authState: 'login',
  setAuth: state => set({ authState: state }),
}))
