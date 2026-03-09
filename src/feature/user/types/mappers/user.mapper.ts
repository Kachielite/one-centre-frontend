import type { IUserModel } from "@/feature/user/types/user.model.ts"
import type { IUserDTO } from "@/feature/user/types/user.dto.ts"
import type { SubscriptionTierEnum } from "@/feature/subscription/types/subscription.enum.ts"

export const mapUserDTOToUser = (userDTO: IUserDTO): IUserModel => {
  return {
    id: userDTO.id,
    email: userDTO.email,
    name: userDTO.name,
    subscriptionTier: userDTO.subscription_tier as SubscriptionTierEnum,
    createdAt: userDTO.created_at,
    updatedAt: userDTO.updated_at,
    isActive: userDTO.is_active,
    isVerified: userDTO.is_verified,
    aiCreditsBalance: userDTO.ai_credits_balance,
  }
}
