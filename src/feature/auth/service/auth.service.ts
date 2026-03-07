import ENV from "@/core/constants/env.constant.ts"
import {
  type CreateUserPayload,
  type LoginUserPayload,
  loginUserPayloadSchema,
  type ResetPasswordPayload,
  type SocialLoginPayload,
  type VerifyEmailPayload,
  type VerifyOtpPayload,
} from "@/feature/auth/types/auth.payload.ts"
import type { IAuthModel } from "@/feature/auth/types/auth.model.ts"
import axios, { type AxiosError } from "axios"
import { serviceErrorHandler } from "@/core/utils/helpers/error-handling.ts"
import type {
  IGeneralResponseModel,
  IGeneralResponseWithDataModel,
} from "@/core/types/app.model.ts"
import { mapAuthToken } from "@/feature/auth/types/mappers/auth.mapper.ts"

const PATH = "/auth"
const BASE_URL = ENV.BASE_URL

export const AuthService = {
  register: async (
    payload: CreateUserPayload
  ): Promise<IGeneralResponseWithDataModel<IAuthModel>> => {
    try {
      const response = await axios.post(`${BASE_URL}${PATH}/register`, payload)
      return {
        success: response.data.success,
        message: response.data.message,
        data: mapAuthToken(response.data.data),
      }
    } catch (err) {
      throw serviceErrorHandler(err as AxiosError, "AuthService.register")
    }
  },

  login: async (
    payload: LoginUserPayload
  ): Promise<IGeneralResponseWithDataModel<IAuthModel>> => {
    try {
      const response = await axios.post(
        `${BASE_URL}${PATH}/login`,
        loginUserPayloadSchema.parse(payload)
      )
      return {
        success: response.data.success,
        message: response.data.message,
        data: mapAuthToken(response.data.data),
      }
    } catch (err) {
      throw serviceErrorHandler(err as AxiosError, "AuthService.login")
    }
  },

  verifyOtp: async (
    payload: VerifyOtpPayload
  ): Promise<IGeneralResponseModel> => {
    try {
      const response = await axios.post(
        `${BASE_URL}${PATH}/verify-otp`,
        payload
      )
      return {
        success: response.data.success,
        message: response.data.message,
      }
    } catch (err) {
      throw serviceErrorHandler(err as AxiosError, "AuthService.verifyOtp")
    }
  },

  verifyEmail: async (
    payload: VerifyEmailPayload
  ): Promise<IGeneralResponseModel> => {
    try {
      const response = await axios.post(
        `${BASE_URL}${PATH}/verify-email`,
        payload
      )
      return {
        success: response.data.success,
        message: response.data.message,
      }
    } catch (err) {
      throw serviceErrorHandler(err as AxiosError, "AuthService.verifyEmail")
    }
  },

  forgotPassword: async (
    payload: VerifyEmailPayload
  ): Promise<IGeneralResponseModel> => {
    try {
      const response = await axios.post(
        `${BASE_URL}${PATH}/forgot-password`,
        payload
      )
      return {
        success: response.data.success,
        message: response.data.message,
      }
    } catch (err) {
      throw serviceErrorHandler(err as AxiosError, "AuthService.forgotPassword")
    }
  },

  resetPassword: async (
    payload: ResetPasswordPayload
  ): Promise<IGeneralResponseModel> => {
    try {
      const response = await axios.post(
        `${BASE_URL}${PATH}/reset-password`,
        payload
      )
      return {
        success: response.data.success,
        message: response.data.message,
      }
    } catch (err) {
      throw serviceErrorHandler(err as AxiosError, "AuthService.resetPassword")
    }
  },

  socialLogin: async (
    payload: SocialLoginPayload
  ): Promise<IGeneralResponseWithDataModel<IAuthModel>> => {
    try {
      const response = await axios.post(
        `${BASE_URL}${PATH}/social-login`,
        payload
      )
      return {
        success: response.data.success,
        message: response.data.message,
        data: mapAuthToken(response.data.data),
      }
    } catch (err) {
      throw serviceErrorHandler(err as AxiosError, "AuthService.socialLogin")
    }
  },
}
