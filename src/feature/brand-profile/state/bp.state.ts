import type { IBrandProfileModel } from "@/feature/brand-profile/types/bp.model.ts"
import { create } from "zustand/react"

type BrandProfileStore = {
  brandProfile: IBrandProfileModel | null
  setBrandProfile: (value: IBrandProfileModel | null) => void
  showBrandProfileOnboarding: boolean
  setShowBrandProfileOnboarding: (value: boolean) => void
}

const useBrandProfileStore = create<BrandProfileStore>()((set) => ({
  brandProfile: null,
  setBrandProfile: (value: IBrandProfileModel | null) => {
    set({ brandProfile: value })
  },
  showBrandProfileOnboarding: false,
  setShowBrandProfileOnboarding: (value: boolean) => {
    set({ showBrandProfileOnboarding: value })
  },
}))

export default useBrandProfileStore
