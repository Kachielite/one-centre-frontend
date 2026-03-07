import { z } from "zod"
import {
  AuthProviderEnum,
  OtpTypeEnum,
} from "@/feature/auth/types/auth.enum.ts"

export const createUserPayloadSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
})

export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>

export const loginUserPayloadSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginUserPayload = z.infer<typeof loginUserPayloadSchema>

export const verifyOtpPayloadSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().min(6, "OTP must be at least 6 characters long"),
  type: z.enum(OtpTypeEnum),
})

export type VerifyOtpPayload = z.infer<typeof verifyOtpPayloadSchema>

export const verifyEmailPayloadSchema = z.object({
  email: z.email("Invalid email address"),
})

export type VerifyEmailPayload = z.infer<typeof verifyEmailPayloadSchema>

export const resetPasswordPayloadSchema = z
  .object({
    email: z.email("Invalid email address"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
    otp: z.string().min(6, "OTP must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordPayloadSchema>
export type ResetPasswordPayload = Omit<ResetPasswordSchema, "confirmPassword">

export const socialLoginPayloadSchema = z.object({
  provider: z.enum(AuthProviderEnum),
  idToken: z.string().min(1, "Token is required"),
})

export type SocialLoginPayload = z.infer<typeof socialLoginPayloadSchema>
