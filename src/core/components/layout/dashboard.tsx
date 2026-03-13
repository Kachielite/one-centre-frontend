import { Outlet } from "react-router-dom"
import { Button } from "@/core/components/ui/button.tsx"
import { Moon, Sun, Zap } from "lucide-react"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/core/components/ui/sidebar.tsx"
import { AppSidebar } from "@/core/components/layout/app-side-bar.tsx"
import { RightPanel } from "@/core/components/layout/right-panel.tsx"
import { useTheme } from "@/core/components/theme-provider.tsx"
import useGetCurrentUser from "@/feature/user/hooks/use-get-current-user.ts"
import { GlobalLoader } from "@/core/components/custom-components/loaders/global-loaders.tsx"
import useUserStore from "@/feature/user/state/user.state.ts"
import { LogoutAlertDialogue } from "@/feature/auth/components/logout-alert.tsx"
import useGetBrandProfile from "@/feature/brand-profile/hooks/use-get-brand-profile.ts"
import { BrandProfileOnboarding } from "@/feature/brand-profile/components/create-brand-profile.tsx"
import { Activity } from "react"
import useBrandProfileStore from "@/feature/brand-profile/state/bp.state.ts"

const DashboardLayout = () => {
  const { theme, toggle } = useTheme()
  const { user } = useUserStore()
  const { showBrandProfileOnboarding } = useBrandProfileStore()
  const { isLoadingUser } = useGetCurrentUser()
  const { isLoadingBrandProfile } = useGetBrandProfile()

  if (isLoadingUser || isLoadingBrandProfile) {
    return <GlobalLoader />
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex min-w-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex items-center gap-2 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggle}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {(user?.aiCreditsBalance || 0).toLocaleString()} AI credits
                  </span>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
          <RightPanel />
        </div>
      </div>
      <LogoutAlertDialogue />
      <Activity mode={showBrandProfileOnboarding ? "visible" : "hidden"}>
        <BrandProfileOnboarding />
      </Activity>
    </SidebarProvider>
  )
}

export default DashboardLayout
