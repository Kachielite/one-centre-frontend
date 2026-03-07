import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import {
  type ResetPasswordPayload,
  resetPasswordPayloadSchema,
  type ResetPasswordSchema,
} from "@/feature/auth/types/auth.payload.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useAuthStore from "@/feature/auth/state/auth.state.ts"
import { useNavigate } from "react-router-dom"

const useResetPassword = () => {
  const navigate = useNavigate()
  const { verification, clearVerification } = useAuthStore()

  const resetPasswordForm = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordPayloadSchema),
    mode: "onBlur",
    defaultValues: {
      email: verification?.email || "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  const { isLoading: isResetting, mutateAsync } = useMutation(
    "reset-password",
    async (data: ResetPasswordPayload) => {
      return AuthService.resetPassword(data)
    },
    {
      onSuccess: (response) => {
        clearVerification()
        resetPasswordForm.reset()
        const message = response.message || "Password reset successful"
        toast.success(message)
        navigate("/login")
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(
          error.message || "An error occurred while resetting password"
        )
      },
    }
  )

  const resetPasswordHandler = async () => {
    await resetPasswordForm.handleSubmit((data) => mutateAsync(data))()
  }

  return {
    isResetting,
    resetPasswordHandler,
    resetPasswordForm,
  }
}

export default useResetPassword
