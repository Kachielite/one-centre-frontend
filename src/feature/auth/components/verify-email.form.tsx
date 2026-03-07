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
import useVerifyEmail from "@/feature/auth/hooks/use-verify-email.ts"
import CustomTextInput from "@/core/components/custom-components/form/custom-text-input.tsx"

export function VerifyEmailForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const { isSendingVerification, verifyEmailHandler, verifyEmailForm } =
    useVerifyEmail()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify your email address</CardTitle>
          <CardDescription className="text-balance">
            We will send you a verification code to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await verifyEmailHandler()
            }}
          >
            <FieldGroup>
              <CustomTextInput
                id="email"
                formController={verifyEmailForm}
                label="Email"
                disabled={isSendingVerification}
                placeholder="m@example.com"
              />
              <Field>
                <Button disabled={isSendingVerification} type="submit">
                  {isSendingVerification
                    ? "Sending..."
                    : "Send Verification Email"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
