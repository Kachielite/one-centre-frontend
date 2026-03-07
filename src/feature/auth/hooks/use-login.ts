import useAuthStore from "@/feature/auth/state/auth.state.ts"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import type { LoginUserPayload } from "@/feature/auth/types/auth.payload.ts"
import { loginUserPayloadSchema } from "@/feature/auth/types/auth.payload.ts"
import { useNavigate } from "react-router-dom"

const useLogin = () => {
  const navigate = useNavigate()
  const { setToken, setVerification } = useAuthStore()

  const loginForm = useForm<LoginUserPayload>({
    resolver: zodResolver(loginUserPayloadSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isLoading: isLoggingIn, mutateAsync } = useMutation(
    "login-user",
    async (data: LoginUserPayload) => {
      return AuthService.login(data)
    },
    {
      onSuccess: (response) => {
        const accessToken = response.data?.accessToken as string
        const refreshToken = response.data?.refreshToken as string
        const message = response.message || "Login successful"
        setToken({
          accessToken,
          refreshToken,
        })
        loginForm.reset()
        toast.success(message)
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(error.message || "An error occurred during login")
        if (
          error.message ===
          "Your email is not verified. A new OTP has been sent to your email."
        ) {
          setVerification({
            email: loginForm.getValues("email"),
            otp: "",
          })
          navigate("/verify-otp")
        }
      },
    }
  )

  const loginHandler = async () => {
    await loginForm.handleSubmit((data) => mutateAsync(data))()
  }

  return {
    loginForm,
    isLoggingIn,
    loginHandler,
  }
}

export default useLogin
