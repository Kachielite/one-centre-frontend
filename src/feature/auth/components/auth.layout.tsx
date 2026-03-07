import React from "react"
import OneCentreLogo from "@/core/components/custom-components/logo.tsx"
import { FieldDescription } from "@/core/components/ui/field.tsx"

function AuthLayout({
  children,
  showPrivacyText = false,
}: {
  children: React.ReactNode
  showPrivacyText?: boolean
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-muted">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <OneCentreLogo showText />
        </a>
        {children}
      </div>
      {showPrivacyText && (
        <FieldDescription className="px-6 text-center text-balance text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      )}
    </div>
  )
}

export default AuthLayout
