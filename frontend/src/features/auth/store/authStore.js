import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserRole } from '../../../shared/utils/constants'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,

      setAuth: (user, accessToken, refreshToken) => {
        set({ user, accessToken, refreshToken, isLoggedIn: !!accessToken })
      },

      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null, isLoggedIn: false })
      },

      isAdmin: () => get().user?.role === UserRole.Admin,
    }),
    {
      name: 'auth-storage',
      partial: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
)