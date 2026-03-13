import type { IBrandProfileDTO } from "@/feature/brand-profile/types/bp.dto.ts"
import type { IBrandProfileModel } from "@/feature/brand-profile/types/bp.model.ts"

export const mapBrandProfileDTOToModel = (
  dto: IBrandProfileDTO
): IBrandProfileModel => {
  return {
    id: dto.id,
    name: dto.name,
    bioContext: dto.bio_context,
    toneGuidelines: dto.tone_guidelines,
    websiteUrl: dto.website_url,
    logo: dto.logo,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  }
}
