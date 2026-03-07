import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import {
  type VerifyEmailPayload,
  verifyEmailPayloadSchema,
} from "@/feature/auth/types/auth.payload.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const useVerifyEmail = () => {
  const navigate = useNavigate()
  const verifyEmailForm = useForm<VerifyEmailPayload>({
    resolver: zodResolver(verifyEmailPayloadSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  })

  const { isLoading: isSendingVerification, mutateAsync } = useMutation(
    "verify-email",
    async (data: VerifyEmailPayload) => {
      return AuthService.verifyEmail(data)
    },
    {
      onSuccess: (response) => {
        const message =
          response.message || "Email verification sent successfully"
        toast.success(message)
        navigate("/verify-otp")
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(
          error.message || "An error occurred while sending verification email"
        )
      },
    }
  )

  const verifyEmailHandler = async () => {
    await verifyEmailForm.handleSubmit((data) => mutateAsync(data))()
  }

  return {
    verifyEmailForm,
    isSendingVerification,
    verifyEmailHandler,
  }
}

export default useVerifyEmail
