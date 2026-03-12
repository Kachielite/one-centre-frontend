import { toast } from "sonner"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { BrandProfileService } from "@/feature/brand-profile/service/bp.service.ts"
import { useQuery } from "react-query"
import useBrandProfileStore from "@/feature/brand-profile/state/bp.state.ts"
import useAuthStore from "@/feature/auth/state/auth.state.ts"

const useGetBrandProfile = () => {
  const { token } = useAuthStore()
  const { setBrandProfile } = useBrandProfileStore()

  const { isLoading: isLoadingBrandProfile } = useQuery(
    "brand-profile",
    async () => {
      return BrandProfileService.getBrandProfile()
    },
    {
      enabled: !!token, // Only fetch if token exists
      onSuccess: (data) => {
        setBrandProfile(data)
      },
      onError: (error: IErrorResponseModel) => {
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
