import useAuthStore from "@/feature/auth/state/auth.state.ts"
import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import type { SocialLoginPayload } from "@/feature/auth/types/auth.payload.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"

const useSocialLogin = () => {
  const { setToken } = useAuthStore()

  const { isLoading: isSocialLoggingIn, mutateAsync } = useMutation(
    "social-login",
    async (data: SocialLoginPayload) => {
      return AuthService.socialLogin(data)
    },
    {
      onSuccess: (response) => {
        const accessToken = response.data?.accessToken as string
        const refreshToken = response.data?.refreshToken as string
        const message = response.message || "Social login successful"
        setToken({ accessToken, refreshToken })
        toast.success(message)
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(error.message || "An error occurred during social login")
      },
    }
  )

  const socialLoginHandler = async (payload: SocialLoginPayload) => {
    await mutateAsync(payload)
  }

  return {
    isSocialLoggingIn,
    socialLoginHandler,
  }
}

export default useSocialLogin
