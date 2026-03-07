import useAuthStore from "@/feature/auth/state/auth.state.ts"
import { useForm } from "react-hook-form"
import {
  type CreateUserPayload,
  createUserPayloadSchema,
} from "@/feature/auth/types/auth.payload.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "react-query"
import { AuthService } from "@/feature/auth/service/auth.service.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const useRegister = () => {
  const navigate = useNavigate()
  const { setToken, clearVerification, verification } = useAuthStore()

  const registrationForm = useForm<CreateUserPayload>({
    resolver: zodResolver(createUserPayloadSchema),
    mode: "onBlur",
    defaultValues: {
      email: verification?.email || "",
      password: "",
      name: "",
    },
  })

  const { isLoading: isRegistering, mutateAsync } = useMutation(
    "register-user",
    async (data: CreateUserPayload) => {
      return AuthService.register(data)
    },
    {
      onSuccess: (response) => {
        const accessToken = response.data?.accessToken as string
        const refreshToken = response.data?.refreshToken as string
        const message = response.message || "Registration successful"
        setToken({
          accessToken,
          refreshToken,
        })
        registrationForm.reset()
        clearVerification()
        navigate("/")
        toast.success(message)
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(error.message || "An error occurred during registration")
      },
    }
  )

  const registerHandler = async () => {
    await registrationForm.handleSubmit((data) => mutateAsync(data))()
  }

  return {
    registrationForm,
    isRegistering,
    registerHandler,
  }
}

export default useRegister
