import { redirect } from "react-router-dom"
import ENV from "@/core/constants/env.constant.ts"
import zustandStorage from "@/core/utils/zustand-storage.ts"

function migrateLegacyStorage() {
  try {
    const legacy = zustandStorage.getItem(ENV.STORAGE_KEY) as string | null
    if (!legacy) return

    const parsed = JSON.parse(legacy as string)

    // If parsed already contains separate state slices, try to split them
    // Expecting shapes like: { state: { token: {...}, verification: {...}, user: {...} } }
    const rootState = parsed?.state ?? parsed

    const authSlice = {
      state: {
        token: rootState?.token ?? null,
        verification: rootState?.verification ?? null,
      },
      version: parsed?.version ?? 0,
    }

    const userSlice = {
      state: {
        user: rootState?.user ?? null,
      },
      version: parsed?.version ?? 0,
    }

    // Only write out if there's any data to preserve
    if (authSlice.state.token || authSlice.state.verification) {
      zustandStorage.setItem(ENV.AUTH_STORAGE_KEY, JSON.stringify(authSlice))
    }

    if (userSlice.state.user) {
      zustandStorage.setItem(ENV.USER_STORAGE_KEY, JSON.stringify(userSlice))
    }

    // remove legacy key
    zustandStorage.removeItem(ENV.STORAGE_KEY)
  } catch (err) {
    // ignore migration errors
    void err
  }
}

export function getAuthFromStorage() {
  // attempt migration once on read
  migrateLegacyStorage()

  const authData = zustandStorage.getItem(ENV.AUTH_STORAGE_KEY) as string | null
  if (!authData) return null

  try {
    return JSON.parse(authData as string)
  } catch {
    return null
  }
}

export const authService = {
  isAuthenticated: (): boolean => {
    try {
      const authData = zustandStorage.getItem(ENV.AUTH_STORAGE_KEY) as
        | string
        | null
      if (!authData) return false

      const parsed = JSON.parse(authData as string)
      const accessToken =
        parsed?.state?.token?.accessToken ??
        parsed?.token?.accessToken ??
        parsed?.accessToken
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
