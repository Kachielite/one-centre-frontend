import { SubscriptionTierEnum } from "@/feature/subscription/types/subscription.enum.ts"

export interface IUserModel {
  id: number
  name: string
  email: string
  isActive: boolean
  isVerified: boolean
  subscriptionTier: SubscriptionTierEnum
  aiCreditsBalance: number
  createdAt: string
  updatedAt: string
}
