import AuthLayout from "@/feature/auth/components/auth.layout.tsx"
import { RegisterForm } from "@/feature/auth/components/register.form.tsx"

function RegisterPage() {
  return (
    <AuthLayout showPrivacyText>
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage
