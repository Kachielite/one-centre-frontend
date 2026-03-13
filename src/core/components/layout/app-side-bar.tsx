import {
  BarChart3,
  Clock,
  Command,
  FileText,
  Link2,
  LogOut,
  Settings,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/core/components/ui/sidebar.tsx"
import { forwardRef } from "react"
import { cn } from "@/core/lib/utils.ts"
import {
  NavLink as RouterNavLink,
  type NavLinkProps,
  useLocation,
} from "react-router-dom"
import OneCentreLogo from "@/core/components/custom-components/logo.tsx"
import useAuthStore from "@/feature/auth/state/auth.state.ts"

const mainItems = [
  { title: "Command", url: "/", icon: Command },
  { title: "Queue", url: "/queue", icon: Clock },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Posts", url: "/posts", icon: FileText },
]

const workspaceItems = [
  { title: "Accounts", url: "/accounts", icon: Link2 },
  { title: "Settings", url: "/settings", icon: Settings },
]

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string
  activeClassName?: string
  pendingClassName?: string
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            className,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
        {...props}
      />
    )
  }
)

NavLink.displayName = "NavLink"

export function AppSidebar() {
  const { setShowLogoutConfirmation } = useAuthStore()
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        {/* Logo */}
        <div className="border-b border-border px-4 py-5">
          {!collapsed && (
            <div>
              <OneCentreLogo />
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <OneCentreLogo showText={false} />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-accent/50"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      className="hover:bg-accent/50"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setShowLogoutConfirmation(true)}
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && <span>Log out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
