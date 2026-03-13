import { toast } from "sonner"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { BrandProfileService } from "@/feature/brand-profile/service/bp.service.ts"
import { useQuery } from "react-query"
import useBrandProfileStore from "@/feature/brand-profile/state/bp.state.ts"
import useAuthStore from "@/feature/auth/state/auth.state.ts"

const useGetBrandProfile = () => {
  const { token } = useAuthStore()
  const { setShowBrandProfileOnboarding, showBrandProfileOnboarding } =
    useBrandProfileStore()
  const { setBrandProfile } = useBrandProfileStore()

  const { isLoading: isLoadingBrandProfile } = useQuery(
    "brand-profile",
    async () => {
      return BrandProfileService.getBrandProfile()
    },
    {
      // Only fetch if token exists and onboarding is not already shown
      enabled: !!token && !showBrandProfileOnboarding,
      onSuccess: (data) => {
        setShowBrandProfileOnboarding(false)
        setBrandProfile(data.data)
      },
      onError: (error: IErrorResponseModel) => {
        if (
          error.message ===
          "Unable to find a brand profile for your account. Please create one to get started."
        ) {
          setBrandProfile(null)
          setShowBrandProfileOnboarding(true)
          return
        }
        toast.error(
          error.message || "An error occurred while fetching brand profile data"
        )
      },
    }
  )

  return {
    isLoadingBrandProfile,
  }
}

export default useGetBrandProfile
