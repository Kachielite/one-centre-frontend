import { type ComponentType } from "react"

// Route types and interfaces
export interface RouteConfig {
  path: string
  element: ComponentType
  protected?: boolean
  redirectTo?: string
}

export interface AuthState {
  isAuthenticated: boolean
}
