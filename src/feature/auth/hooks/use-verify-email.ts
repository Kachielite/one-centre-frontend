import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import type { VerifyEmailPayload } from "@/feature/auth/types/auth.payload.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"

const useVerifyEmail = () => {
  const { isLoading: isVerifyingEmail, mutateAsync } = useMutation(
    "verify-email",
    async (data: VerifyEmailPayload) => {
      return AuthService.verifyEmail(data)
    },
    {
      onSuccess: (response) => {
        const message = response.message || "Email verified successfully"
        toast.success(message)
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(error.message || "An error occurred while verifying email")
      },
    }
  )

  const verifyEmailHandler = async (payload: VerifyEmailPayload) => {
    await mutateAsync(payload)
  }

  return {
    isVerifyingEmail,
    verifyEmailHandler,
  }
}

export default useVerifyEmail
