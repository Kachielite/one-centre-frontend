import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import type { VerifyEmailPayload } from "@/feature/auth/types/auth.payload.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"

const useForgotPassword = () => {
  const { isLoading: isRequesting, mutateAsync } = useMutation(
    "forgot-password",
    async (data: VerifyEmailPayload) => {
      return AuthService.forgotPassword(data)
    },
    {
      onSuccess: (response) => {
        const message = response.message || "Password reset email sent"
        toast.success(message)
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(
          error.message || "An error occurred while requesting password reset"
        )
      },
    }
  )

  const forgotPasswordHandler = async (payload: VerifyEmailPayload) => {
    await mutateAsync(payload)
  }

  return {
    isRequesting,
    forgotPasswordHandler,
  }
}

export default useForgotPassword
