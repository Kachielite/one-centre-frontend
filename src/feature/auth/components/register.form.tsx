import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/core/components/ui/field.tsx"
import { cn } from "@/core/lib/utils.ts"
import { Button } from "@/core/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card.tsx"
import type { ComponentProps } from "react"
import CustomTextInput from "@/core/components/custom-components/form/custom-text-input.tsx"
import useRegister from "@/feature/auth/hooks/use-register.ts"
import { Link } from "react-router-dom"

export function RegisterForm({ className, ...props }: ComponentProps<"div">) {
  const { registrationForm, isRegistering, registerHandler } = useRegister()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await registerHandler()
            }}
          >
            <FieldGroup>
              <CustomTextInput
                id="name"
                formController={registrationForm}
                label="Name"
                disabled={isRegistering}
                placeholder="John Doe"
              />
              <CustomTextInput
                id="email"
                formController={registrationForm}
                label="Email"
                disabled={isRegistering}
                placeholder="m@example.com"
              />
              <CustomTextInput
                id="password"
                formController={registrationForm}
                label="Password"
                type="password"
                disabled={isRegistering}
                placeholder="********"
              />
              <Field>
                <Button disabled={isRegistering} type="submit">
                  {isRegistering ? "Creating..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  You have an account? <Link to="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
