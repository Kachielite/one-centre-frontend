import {
  type UpdateUserPayload,
  updateUserPayloadSchema,
} from "@/feature/user/types/user.payload.ts"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useUserStore from "@/feature/user/state/user.state.ts"
import { useMutation } from "react-query"
import { UserService } from "@/feature/user/service/user.service.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"
import { useEffect } from "react"

const useUpdateUser = () => {
  const { user, setUser } = useUserStore()

  const updateUserForm = useForm<UpdateUserPayload>({
    defaultValues: {
      id: user?.id as number,
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      old_password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(updateUserPayloadSchema),
  })

  const { isLoading: isUpdatingUser, mutateAsync } = useMutation(
    "update-user",
    async (data: UpdateUserPayload) => {
      return UserService.updateCurrentUser(data)
    },
    {
      onSuccess: (updatedUser) => {
        setUser(updatedUser)
        updateUserForm.reset({
          name: updatedUser.name,
          email: updatedUser.email,
          password: "",
        })
        toast.success("User information updated successfully")
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(
          error.message || "An error occurred while updating user information"
        )
      },
    }
  )

  const { reset } = updateUserForm
  useEffect(() => {
    reset({
      id: user?.id as number,
      name: user?.name || "",
      email: user?.email || "",
    })
  }, [reset, user])

  const updateUserHandler = async () => {
    await updateUserForm.handleSubmit((data) => mutateAsync(data))()
  }

  return {
    updateUserForm,
    isUpdatingUser,
    updateUserHandler,
  }
}

export default useUpdateUser
