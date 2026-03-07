import { redirect } from "react-router-dom"
import ENV from "@/core/constants/env.constant.ts"
import zustandStorage from "@/core/utils/zustand-storage.ts"
import type { IAuthModel } from "@/feature/auth/types/auth.model.ts"

export const authService = {
  isAuthenticated: (): boolean => {
    try {
      const authData = zustandStorage.getItem(ENV.STORAGE_KEY)
      if (!authData) {
        return false
      }

      const accessToken = (authData as unknown as IAuthModel).accessToken
      return Boolean(accessToken)
    } catch {
      return false
    }
  },
}

// Protected route loader - runs before component renders
export const protectedLoader = async () => {
  const isAuth = authService.isAuthenticated()
  if (!isAuth) {
    throw redirect("/login")
  }
  return null
}

// Public only route loader (redirects authenticated users)
export const publicOnlyLoader = async () => {
  const isAuth = authService.isAuthenticated()
  if (isAuth) {
    throw redirect("/")
  }
  return null
}
