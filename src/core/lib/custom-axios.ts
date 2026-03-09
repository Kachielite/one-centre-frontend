import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios"
import axios from "axios"
import ENV from "@/core/constants/env.constant.ts"
import zustandStorage from "@/core/utils/zustand-storage.ts"
import { toast } from "sonner"

function getToken(): string | null {
  try {
    const raw = zustandStorage.getItem(ENV.STORAGE_KEY) as string | null
    if (!raw) return null

    const parsed = JSON.parse(raw)
    const token = parsed?.state?.token?.accessToken ?? null

    return typeof token === "string" && token.length > 0 ? token : null
  } catch {
    return null
  }
}

const customAxios = axios.create({
  baseURL: ENV.BASE_URL,
})

// ── Request interceptor: attach Bearer token ──
customAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const token = getToken()
    if (!token) return config

    const existing = (config.headers ?? {}) as Record<string, string>
    const merged: Record<string, string> = {
      ...existing,
      Authorization: `Bearer ${token}`,
    }
    config.headers = merged as unknown as AxiosRequestHeaders

    return config
  } catch {
    return config
  }
})

// ── Response interceptor: handle 401 / Unauthorized ──
let isRedirecting = false

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const message = error?.response?.data?.message

    if (
      (status === 401 || message === "Unauthorized") &&
      !isRedirecting &&
      window.location.pathname !== "/login"
    ) {
      toast.info("Session expired. Redirecting to login...")
      isRedirecting = true

      try {
        zustandStorage.removeItem(ENV.STORAGE_KEY)
      } catch {
        // ignore storage errors
      }

      window.location.replace("/login")
    }

    return Promise.reject(error)
  }
)

export default customAxios
