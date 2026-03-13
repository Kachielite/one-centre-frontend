import type { AxiosError } from "axios"
import { serviceErrorHandler } from "@/core/utils/helpers/error-handling.ts"
import customAxios from "@/core/lib/custom-axios.ts"
import type {
  BrandProfileCreationDTO,
  BrandProfileUpdateDTO,
} from "@/feature/brand-profile/types/bp.payload.ts"
import type { IBrandProfileModel } from "@/feature/brand-profile/types/bp.model.ts"
import type { IGeneralResponseWithDataModel } from "@/core/types/app.model.ts"
import { mapBrandProfileDTOToModel } from "@/feature/brand-profile/types/mappers/bp.mapper.ts"

const PATH = "/brand-profiles"

export const BrandProfileService = {
  getBrandProfile: async (): Promise<
    IGeneralResponseWithDataModel<IBrandProfileModel>
  > => {
    try {
      const response = await customAxios.get(`${PATH}`)
      return {
        success: response.data.success,
        message: response.data.message,
        data: mapBrandProfileDTOToModel(response.data.data),
      }
    } catch (err) {
      throw serviceErrorHandler(
        err as AxiosError,
        "BrandProfileService.getBrandProfile"
      )
    }
  },

  createBrandProfile: async (
    payload: BrandProfileCreationDTO
  ): Promise<IGeneralResponseWithDataModel<IBrandProfileModel>> => {
    try {
      const response = await customAxios.post(`${PATH}`, payload)
      return {
        success: response.data.success,
        message: response.data.message,
        data: mapBrandProfileDTOToModel(response.data.data),
      }
    } catch (err) {
      throw serviceErrorHandler(
        err as AxiosError,
        "BrandProfileService.createBrandProfile"
      )
    }
  },

  updateBrandProfile: async (
    payload: BrandProfileUpdateDTO
  ): Promise<IGeneralResponseWithDataModel<IBrandProfileModel>> => {
    try {
      const response = await customAxios.put(`${PATH}`, payload)
      return {
        success: response.data.success,
        message: response.data.message,
        data: mapBrandProfileDTOToModel(response.data.data),
      }
    } catch (err) {
      throw serviceErrorHandler(
        err as AxiosError,
        "BrandProfileService.updateBrandProfile"
      )
    }
  },
}
