import type { IUserModel } from "@/feature/user/types/user.model.ts"
import customAxios from "@/core/lib/custom-axios.ts"
import { serviceErrorHandler } from "@/core/utils/helpers/error-handling.ts"
import type { AxiosError } from "axios"
import type { UpdateUserPayload } from "@/feature/user/types/user.payload.ts"
import { mapUserDTOToUser } from "@/feature/user/types/mappers/user.mapper.ts"

const PATH = "/users"

export const UserService = {
  getCurrentUser: async (): Promise<IUserModel> => {
    try {
      const response = await customAxios.get(`${PATH}/me`)
      return mapUserDTOToUser(response.data) as IUserModel
    } catch (err) {
      throw serviceErrorHandler(err as AxiosError, "UserService.getCurrentUser")
    }
  },

  updateCurrentUser: async (
    payload: UpdateUserPayload
  ): Promise<IUserModel> => {
    try {
      const requestBody: Record<string, string> = {}

      if (payload.name) {
        requestBody["name"] = payload.name
      }

      if (payload.password && payload.old_password) {
        requestBody["password"] = payload.password
        requestBody["old_password"] = payload.old_password
      }
      const response = await customAxios.put(
        `${PATH}/${payload.id}`,
        requestBody
      )
      return mapUserDTOToUser(response.data) as IUserModel
    } catch (err) {
      throw serviceErrorHandler(
        err as AxiosError,
        "UserService.updateCurrentUser"
      )
    }
  },
}
