import type { IAuthModel } from "@/feature/auth/types/auth.model.ts"
import { create } from "zustand/react"
import { createJSONStorage, persist } from "zustand/middleware"
import zustandStorage from "@/core/utils/zustand-storage.ts"
import ENV from "@/core/constants/env.constant.ts"

type Verification = {
  email: string
  otp: string
}

type AuthStore = {
  token: IAuthModel | null
  verification: Verification | null
  setToken: (value: IAuthModel | null) => void
  clearToken: () => void
  setVerification: (value: Verification) => void
  clearVerification: () => void
  showLogoutConfirmation: boolean
  setShowLogoutConfirmation: (value: boolean) => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      verification: null,
      setToken: (value: IAuthModel | null) => {
        set({ token: value })
      },
      clearToken: () => {
        set({ token: null })
        localStorage.removeItem(ENV.AUTH_STORAGE_KEY)
        localStorage.removeItem(ENV.USER_STORAGE_KEY)
        window.location.replace("/login")
      },
      setVerification: (value: Verification) => {
        set({ verification: value })
      },
      clearVerification: () => {
        set({ verification: null })
      },
      showLogoutConfirmation: false,
      setShowLogoutConfirmation: (value: boolean) => {
        set({ showLogoutConfirmation: value })
      },
    }),
    {
      name: ENV.AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        token: state.token,
        verification: state.verification,
      }),
    }
  )
)

export default useAuthStore
