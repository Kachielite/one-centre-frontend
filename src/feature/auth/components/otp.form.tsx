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
import { useEffect } from "react"
import useVerifyOtp from "@/feature/auth/hooks/use-verify-otp.ts"
import CustomOtpInput from "@/core/components/custom-components/form/custom-otp-input.tsx"
import useAuthStore from "@/feature/auth/state/auth.state.ts"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import useVerifyEmail from "@/feature/auth/hooks/use-verify-email.ts"

export function VerifyOtpForm({ className, ...props }: ComponentProps<"div">) {
  const { isVerifyingOtp, verifyOtpHandler, verifyOtpForm } = useVerifyOtp()
  const { verifyEmailHandler, isSendingVerification } = useVerifyEmail()
  const { verification } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!verification) {
      toast.warning("Please verify your email first.")
      navigate("/verify-email")
    }
  }, [verification, navigate])
  if (!verification) return null

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify OTP</CardTitle>
          <CardDescription className="text-balance">
            Please enter the OTP sent to your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await verifyOtpHandler()
            }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <FieldGroup>
              <CustomOtpInput
                id="otp"
                formController={verifyOtpForm}
                label="Verification code"
                resendHandler={verifyEmailHandler}
                isResending={isSendingVerification}
              />
              <Field>
                <Button disabled={isVerifyingOtp} type="submit">
                  {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
