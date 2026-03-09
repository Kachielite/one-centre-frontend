import useUserStore from "@/feature/user/state/user.state.ts"
import { useQuery } from "react-query"
import { UserService } from "@/feature/user/service/user.service.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import useAuthStore from "@/feature/auth/state/auth.state.ts"

const useGetCurrentUser = () => {
  const { token } = useAuthStore()
  const { setUser } = useUserStore()

  const { isLoading: isLoadingUser } = useQuery(
    "current-user",
    async () => {
      return UserService.getCurrentUser()
    },
    {
      enabled: !!token, // Only fetch if token exists
      onSuccess: (data) => {
        setUser(data)
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(
          error.message || "An error occurred while fetching user data"
        )
      },
    }
  )

  return {
    isLoadingUser,
  }
}

export default useGetCurrentUser
