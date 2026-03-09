import { ShieldEllipsisIcon, User } from "lucide-react"
import { type ElementType, useState } from "react"
import ProfileTab from "@/feature/settings/components/profile.tsx"
import SecurityTab from "@/feature/settings/components/security.tsx"

type Tab = "profile" | "security"

const tabs: { key: Tab; label: string; icon: ElementType }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: ShieldEllipsisIcon },
]

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, plan, and preferences
        </p>
      </div>

      {/* Tab nav - horizontal on mobile, vertical on desktop */}
      <div className="mb-6 flex gap-1.5 overflow-x-auto md:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Tab nav - desktop only */}
        <nav className="hidden w-48 shrink-0 space-y-1 md:block">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeTab === tab.key
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div className="min-w-0 flex-1 rounded-lg border bg-card p-6">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
