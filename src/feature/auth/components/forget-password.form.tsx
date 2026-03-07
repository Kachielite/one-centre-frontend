import { Field, FieldGroup } from "@/core/components/ui/field.tsx"
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
import useForgotPassword from "@/feature/auth/hooks/use-forgot-password.ts"

export function ForgetPasswordForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const { isRequesting, forgotPasswordHandler, forgetPasswordForm } =
    useForgotPassword()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription className="text-balance">
            No worries. Enter your email and we&apos;ll send you a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await forgotPasswordHandler()
            }}
          >
            <FieldGroup>
              <CustomTextInput
                id="email"
                formController={forgetPasswordForm}
                label="Email"
                disabled={isRequesting}
                placeholder="m@example.com"
              />
              <Field>
                <Button disabled={isRequesting} type="submit">
                  {isRequesting ? "Sending..." : "Send reset link"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
