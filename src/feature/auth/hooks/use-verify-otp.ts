import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import {
  type VerifyOtpPayload,
  verifyOtpPayloadSchema,
} from "@/feature/auth/types/auth.payload.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { OtpTypeEnum } from "@/feature/auth/types/auth.enum.ts"
import useAuthStore from "@/feature/auth/state/auth.state.ts"
import { useNavigate } from "react-router-dom"

const useVerifyOtp = () => {
  const navigate = useNavigate()
  const { verification } = useAuthStore()

  const verifyOtpForm = useForm<VerifyOtpPayload>({
    resolver: zodResolver(verifyOtpPayloadSchema),
    mode: "onBlur",
    defaultValues: {
      email: verification?.email || "",
      otp: "",
      type: OtpTypeEnum.VERIFY_EMAIL,
    },
  })

  const { isLoading: isVerifyingOtp, mutateAsync } = useMutation(
    "verify-otp",
    async (data: VerifyOtpPayload) => {
      return AuthService.verifyOtp(data)
    },
    {
      onSuccess: (response) => {
        const message = response.message || "OTP verified successfully"
        toast.success(message)
        navigate("/register")
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(error.message || "An error occurred while verifying OTP")
      },
    }
  )

  const verifyOtpHandler = async () => {
    await verifyOtpForm.handleSubmit((data) => mutateAsync(data))()
  }

  return {
    verifyOtpForm,
    isVerifyingOtp,
    verifyOtpHandler,
  }
}

export default useVerifyOtp
