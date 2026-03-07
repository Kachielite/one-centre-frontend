import { redirect } from "react-router-dom"

export const authService = {
  isAuthenticated: (): boolean => {
    try {
      const authData = window.localStorage.getItem("auth-token")
      if (!authData) {
        return false
      }

      const parsed = JSON.parse(authData)
      const accessToken = parsed?.state?.token?.accessToken
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
