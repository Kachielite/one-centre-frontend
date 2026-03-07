import {
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form"
import { useEffect, useState } from "react"
import { Field, FieldError, FieldLabel } from "@/core/components/ui/field.tsx"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/core/components/ui/input-otp.tsx"
import { Button } from "@/core/components/ui/button.tsx"
import { RefreshCwIcon } from "lucide-react"

interface CustomOtpInputProps<T extends FieldValues> {
  id: Path<T>
  formController: UseFormReturn<T>
  resendHandler?: () => void
  isResending?: boolean
  label?: string
}

function CustomOtpInput<T extends FieldValues>({
  id,
  formController,
  label,
  resendHandler,
  isResending,
}: CustomOtpInputProps<T>) {
  // 60 second countdown before enabling resend
  const [secondsLeft, setSecondsLeft] = useState<number>(60)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setTimeout(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      1000
    )
    return () => clearTimeout(timer)
  }, [secondsLeft])

  const handleResend = () => {
    if (secondsLeft > 0) return
    resendHandler?.()
    setSecondsLeft(60)
  }

  return (
    <Controller
      name={id}
      control={formController.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Button
              variant="outline"
              size="xs"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              aria-disabled={secondsLeft > 0}
            >
              <RefreshCwIcon />
              {secondsLeft > 0
                ? `Resend Code (${secondsLeft}s)`
                : isResending
                  ? "Resending..."
                  : "Resend Code"}
            </Button>
          </div>
          <div className="my-4 flex w-full items-center justify-center">
            <InputOTP
              maxLength={6}
              defaultValue={String(field.value ?? "")}
              onChange={(value: string) => field.onChange(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-2" />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-2" />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default CustomOtpInput
