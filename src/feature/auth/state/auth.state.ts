import type { IAuthModel } from "@/feature/auth/types/auth.model.ts"
import { create } from "zustand/react"
import { createJSONStorage, persist } from "zustand/middleware/persist"
import zustandStorage from "@/core/utils/zustand-storage.ts"
import ENV from "@/core/constants/env.constant.ts"

type AuthStore = {
  token: IAuthModel | null
  setToken: (value: IAuthModel) => void
  clearToken: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (value: IAuthModel) => {
        set({ token: value })
        zustandStorage.setItem(ENV.STORAGE_KEY, JSON.stringify(value))
      },
      clearToken: () => {
        set({ token: null })
        zustandStorage.removeItem(ENV.STORAGE_KEY)
      },
    }),
    {
      name: ENV.STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)

export default useAuthStore
