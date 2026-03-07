import AuthLayout from "@/feature/auth/components/auth.layout.tsx"
import { ForgetPasswordForm } from "@/feature/auth/components/forget-password.form.tsx"

function ForgetPasswordPage() {
  return (
    <AuthLayout>
      <ForgetPasswordForm />
    </AuthLayout>
  )
}

export default ForgetPasswordPage
