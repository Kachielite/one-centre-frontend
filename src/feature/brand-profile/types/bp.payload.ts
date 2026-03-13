import { z } from "zod"

export const BrandProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters"),
  bio_context: z.string(),
  tone_guidelines: z
    .union([
      z.object({}).catchall(z.unknown()),
      z.array(z.unknown()),
      z.string(),
      z.number(),
      z.boolean(),
    ])
    .nullable(),
  website_url: z.url("Invalid URL format").nullable().optional(),
  logo: z.file().nullable().optional(),
})
export type BrandProfileCreationDTO = z.infer<typeof BrandProfileSchema>

export const BrandProfileUpdateSchema = BrandProfileSchema.partial()
export type BrandProfileUpdateDTO = z.infer<typeof BrandProfileUpdateSchema>
