import { z } from "zod"

export const BrandProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters"),
  bio_context: z.string(),
  tone_guidelines: z.string().optional(),
  website_url: z.url("Invalid URL format").nullable(),
  logo: z.file().nullable(),
})

export type BrandProfileCreationDTO = z.infer<typeof BrandProfileSchema>
export type BrandProfileUpdateDTO = Partial<BrandProfileCreationDTO>
