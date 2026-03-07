import useAuthStore from "@/feature/auth/state/auth.state.ts"
import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import type { SocialLoginPayload } from "@/feature/auth/types/auth.payload.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import { AuthProviderEnum } from "@/feature/auth/types/auth.enum.ts"
import type { CredentialResponse } from "@react-oauth/google"

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

  /**
   * Handler for the <GoogleLogin /> component's onSuccess callback.
   * The GoogleLogin component returns a CredentialResponse containing a JWT `credential` (id_token),
   * which is exactly what the backend expects.
   *
   * Usage in your component:
   *   <GoogleLogin onSuccess={handleGoogleCredentialResponse} onError={() => toast.error("Google login failed")} />
   */
  const handleGoogleCredentialResponse = async (
    credentialResponse: CredentialResponse
  ) => {
    const idToken = credentialResponse.credential

    if (!idToken) {
      console.error(
        "Google login: no credential (id_token) in response",
        credentialResponse
      )
      toast.error("Google login failed: missing id_token")
      return
    }

    try {
      await mutateAsync({
        provider: AuthProviderEnum.GOOGLE,
        idToken,
      })
    } catch (err) {
      console.error("Google login error:", err)
      toast.error("Google login failed")
    }
  }

  return {
    isSocialLoggingIn,
    handleGoogleCredentialResponse,
  }
}

export default useSocialLogin
