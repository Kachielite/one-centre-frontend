export interface IBrandProfileModel {
  id: number
  name: string
  bioContext?: string
  toneGuidelines?: Record<string, never>
  websiteUrl?: string
  logo?: string
  createdAt: string
  updatedAt: string
}
