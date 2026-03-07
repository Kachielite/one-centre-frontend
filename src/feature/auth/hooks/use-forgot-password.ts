import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import {
  type VerifyEmailPayload,
  verifyEmailPayloadSchema,
} from "@/feature/auth/types/auth.payload.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/feature/auth/state/auth.state.ts"

const useForgotPassword = () => {
  const navigate = useNavigate()
  const { setVerification, verification } = useAuthStore()
  const forgetPasswordForm = useForm<VerifyEmailPayload>({
    defaultValues: {
      email: verification?.email || "",
    },
    mode: "onBlur",
    resolver: zodResolver(verifyEmailPayloadSchema),
  })

  const { isLoading: isRequesting, mutateAsync } = useMutation(
    "forgot-password",
    async (data: VerifyEmailPayload) => {
      return AuthService.forgotPassword(data)
    },
    {
      onSuccess: (response) => {
        setVerification({
          email: forgetPasswordForm.getValues("email"),
          otp: "",
        })
        const message = response.message || "Password reset email sent"
        toast.success(message)
        navigate("/reset-password")
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(
          error.message || "An error occurred while requesting password reset"
        )
      },
    }
  )

  const forgotPasswordHandler = async () => {
    await forgetPasswordForm.handleSubmit((data) => mutateAsync(data))()
  }

  return {
    isRequesting,
    forgotPasswordHandler,
    forgetPasswordForm,
  }
}

export default useForgotPassword
