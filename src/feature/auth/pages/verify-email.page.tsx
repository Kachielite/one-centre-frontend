import AuthLayout from "@/feature/auth/components/auth.layout.tsx"
import { VerifyEmailForm } from "@/feature/auth/components/verify-email.form.tsx"

function VerifyEmailPage() {
  return (
    <AuthLayout>
      <VerifyEmailForm />
    </AuthLayout>
  )
}

export default VerifyEmailPage
