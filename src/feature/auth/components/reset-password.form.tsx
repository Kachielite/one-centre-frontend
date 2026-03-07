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
import useResetPassword from "@/feature/auth/hooks/use-reset-password.ts"
import CustomOtpInput from "@/core/components/custom-components/form/custom-otp-input.tsx"
import useForgotPassword from "@/feature/auth/hooks/use-forgot-password.ts"

export function ResetPasswordForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const { resetPasswordForm, resetPasswordHandler, isResetting } =
    useResetPassword()
  const { isRequesting, forgotPasswordHandler } = useForgotPassword()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>
            To reset your password, enter the one-time password (OTP) that we
            emailed to you, then choose a new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await resetPasswordHandler()
            }}
          >
            <FieldGroup>
              <CustomOtpInput
                id="otp"
                formController={resetPasswordForm}
                label="Verification code"
                resendHandler={forgotPasswordHandler}
                isResending={isRequesting}
              />
              <CustomTextInput
                id="newPassword"
                formController={resetPasswordForm}
                label="New Password"
                type="password"
                disabled={isResetting}
                placeholder="********"
              />
              <CustomTextInput
                id="confirmPassword"
                formController={resetPasswordForm}
                label="Confirm Password"
                type="password"
                disabled={isResetting}
                placeholder="********"
              />
              <Field>
                <Button disabled={isResetting} type="submit">
                  {isResetting ? "Resetting..." : "Reset Password"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
