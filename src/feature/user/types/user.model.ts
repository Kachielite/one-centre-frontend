import { SubscriptionTierEnum } from "@/feature/subscription/types/subscription.enum.ts"

export interface IUserModel {
  id: string
  name: string
  email: string
  isActive: boolean
  isVerified: boolean
  subscriptionTier: SubscriptionTierEnum
  ai_credits_balance: number
  createdAt: string
  updatedAt: string
}
