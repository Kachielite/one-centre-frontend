import type { StateStorage } from "zustand/middleware"
import ENV from "@/core/constants/env.constant.ts"

const isDev = import.meta.env.DEV
const safeWriteEnabled =
  (import.meta.env.VITE_SAFE_ZUSTAND_WRITE as string) === "true"

// Run migration early so stores that mount later won't overwrite legacy data
try {
  const legacy = localStorage.getItem(ENV.STORAGE_KEY)
  if (legacy) {
    const parsed = JSON.parse(legacy)
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

    if (authSlice.state.token || authSlice.state.verification) {
      localStorage.setItem(ENV.AUTH_STORAGE_KEY, JSON.stringify(authSlice))
      if (isDev)
        console.debug(
          "[zustand-storage] migrated auth slice to",
          ENV.AUTH_STORAGE_KEY
        )
    }

    if (userSlice.state.user) {
      localStorage.setItem(ENV.USER_STORAGE_KEY, JSON.stringify(userSlice))
      if (isDev)
        console.debug(
          "[zustand-storage] migrated user slice to",
          ENV.USER_STORAGE_KEY
        )
    }

    localStorage.removeItem(ENV.STORAGE_KEY)
    if (isDev)
      console.debug("[zustand-storage] removed legacy key", ENV.STORAGE_KEY)
  }
} catch (err) {
  // ignore migration errors
  void err
}

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    try {
      if (
        safeWriteEnabled &&
        (name === ENV.AUTH_STORAGE_KEY || name === ENV.USER_STORAGE_KEY)
      ) {
        try {
          const existingRaw = localStorage.getItem(name)
          const existing = existingRaw ? JSON.parse(existingRaw) : null
          const incoming = value ? JSON.parse(value) : null

          const existingHasToken = Boolean(
            existing?.state?.token ?? existing?.token ?? existing?.accessToken
          )
          const incomingHasToken = Boolean(
            incoming?.state?.token ?? incoming?.token ?? incoming?.accessToken
          )

          // If we have an existing auth token but incoming write would remove it, skip write
          if (
            name === ENV.AUTH_STORAGE_KEY &&
            existingHasToken &&
            !incomingHasToken
          ) {
            if (isDev)
              console.warn(
                "[zustand-storage] skipped overwriting auth storage because existing token present"
              )
            return
          }

          // For user slice, skip if existing user exists and incoming would clear it
          if (
            name === ENV.USER_STORAGE_KEY &&
            existing?.state?.user &&
            !incoming?.state?.user
          ) {
            if (isDev)
              console.warn(
                "[zustand-storage] skipped overwriting user storage because existing user present"
              )
            return
          }
        } catch (err) {
          // if any parsing errors, fall back to normal write
          void err
        }
      }
    } catch (err) {
      // defensive
      void err
    }

    localStorage.setItem(name, value)
    if (isDev) {
      try {
        const stack = new Error().stack?.split("\n").slice(2, 6).join("\n")
        console.debug(
          "[zustand-storage] setItem",
          name,
          value?.slice?.(0, 200),
          "caller:\n",
          stack
        )
      } catch {
        // ignore logging errors
      }
    }
  },
  getItem: (name) => {
    const value = localStorage.getItem(name)
    return value ?? null
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
    if (isDev) {
      try {
        const stack = new Error().stack?.split("\n").slice(2, 6).join("\n")
        console.debug("[zustand-storage] removeItem", name, "caller:\n", stack)
      } catch {
        // ignore logging errors
      }
    }
  },
}

export default zustandStorage
