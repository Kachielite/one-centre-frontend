import AuthLayout from "@/feature/auth/components/auth.layout.tsx"
import { LoginForm } from "@/feature/auth/components/login.form.tsx"

function LoginPage() {
  return (
    <AuthLayout showPrivacyText>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
