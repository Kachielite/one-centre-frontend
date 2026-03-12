import useBrandProfileStore from "@/feature/brand-profile/state/bp.state.ts"
import { useForm } from "react-hook-form"
import {
  type BrandProfileUpdateDTO,
  BrandProfileUpdateSchema,
} from "@/feature/brand-profile/types/bp.payload.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "react-query"
import { BrandProfileService } from "@/feature/brand-profile/service/bp.service.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"

const useUpdateBrandProfile = () => {
  const { setShowBrandProfileOnboarding, setBrandProfile, brandProfile } =
    useBrandProfileStore()

  const brandProfileUpdateForm = useForm<BrandProfileUpdateDTO>({
    mode: "onBlur",
    defaultValues: {
      name: brandProfile?.name || "",
      bio_context: brandProfile?.bioContext || "",
      tone_guidelines: brandProfile?.toneGuidelines || null,
      website_url: brandProfile?.websiteUrl || null,
    },
    resolver: zodResolver(BrandProfileUpdateSchema),
  })

  const { isLoading: isUpdatingBrandProfile, mutateAsync } = useMutation(
    "update-brand-profile",
    async (data: BrandProfileUpdateDTO) => {
      return BrandProfileService.updateBrandProfile(data)
    },
    {
      onSuccess: (res) => {
        setBrandProfile(res.data)
        brandProfileUpdateForm.reset()
        setShowBrandProfileOnboarding(false)
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(
          error.message || "An error occurred while creating brand profile"
        )
      },
    }
  )

  const updateBrandProfileHandler = async () => {
    await brandProfileUpdateForm.handleSubmit((data) => mutateAsync(data))()
  }

  return {
    brandProfileUpdateForm,
    isUpdatingBrandProfile,
    updateBrandProfileHandler,
  }
}

export default useUpdateBrandProfile
