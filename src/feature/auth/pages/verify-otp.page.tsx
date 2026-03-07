import AuthLayout from "@/feature/auth/components/auth.layout.tsx"
import { VerifyOtpForm } from "@/feature/auth/components/otp.form.tsx"

function VerifyOtpPage() {
  return (
    <AuthLayout>
      <VerifyOtpForm />
    </AuthLayout>
  )
}

export default VerifyOtpPage
