import type { IUserModel } from "@/feature/user/types/user.model.ts"
import { create } from "zustand/react"
import { createJSONStorage, persist } from "zustand/middleware"
import ENV from "@/core/constants/env.constant.ts"
import zustandStorage from "@/core/utils/zustand-storage.ts"

type UserStore = {
  user: IUserModel | null
  setUser: (value: IUserModel | null) => void
  clearUser: () => void
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (value: IUserModel | null) => {
        set({ user: value })
      },
      clearUser: () => {
        set({ user: null })
      },
    }),
    {
      name: ENV.USER_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)

export default useUserStore
