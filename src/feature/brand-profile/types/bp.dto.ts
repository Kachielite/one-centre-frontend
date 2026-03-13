export interface IBrandProfileDTO {
  id: number
  name: string
  bio_context?: string
  tone_guidelines?: Record<string, never>
  website_url?: string
  logo?: string
  created_at: string
  updated_at: string
}
