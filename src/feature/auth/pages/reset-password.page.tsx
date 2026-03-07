import AuthLayout from "@/feature/auth/components/auth.layout.tsx"
import { ResetPasswordForm } from "@/feature/auth/components/reset-password.form.tsx"

function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  )
}

export default ResetPasswordPage
