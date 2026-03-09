import { SubscriptionTierEnum } from "@/feature/subscription/types/subscription.enum.ts"

export interface IUserDTO {
  id: number
  name: string
  email: string
  is_active: boolean
  is_verified: boolean
  subscription_tier: SubscriptionTierEnum
  ai_credits_balance: number
  created_at: string
  updated_at: string
}
