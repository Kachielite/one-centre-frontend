import type { AxiosError } from "axios"
import { serviceErrorHandler } from "@/core/utils/helpers/error-handling.ts"
import customAxios from "@/core/lib/custom-axios.ts"
import type {
  BrandProfileCreationDTO,
  BrandProfileUpdateDTO,
} from "@/feature/brand-profile/types/bp.payload.ts"

const PATH = "/brand-profiles"

export const BrandProfileService = {
  getBrandProfile: async () => {
    try {
      const response = await customAxios.get(`${PATH}`)
      return response.data
    } catch (err) {
      throw serviceErrorHandler(
        err as AxiosError,
        "BrandProfileService.getBrandProfile"
      )
    }
  },

  createBrandProfile: async (payload: BrandProfileCreationDTO) => {
    try {
      const response = await customAxios.post(`${PATH}`, payload)
      return response.data
    } catch (err) {
      throw serviceErrorHandler(
        err as AxiosError,
        "BrandProfileService.createBrandProfile"
      )
    }
  },

  updateBrandProfile: async (payload: BrandProfileUpdateDTO) => {
    try {
      const response = await customAxios.put(`${PATH}`, payload)
      return response.data
    } catch (err) {
      throw serviceErrorHandler(
        err as AxiosError,
        "BrandProfileService.updateBrandProfile"
      )
    }
  },
}
