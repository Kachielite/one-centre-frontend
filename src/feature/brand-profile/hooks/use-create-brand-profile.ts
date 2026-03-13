import useBrandProfileStore from "@/feature/brand-profile/state/bp.state.ts"
import { useForm } from "react-hook-form"
import {
  type BrandProfileCreationDTO,
  BrandProfileSchema,
} from "@/feature/brand-profile/types/bp.payload.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "react-query"
import { BrandProfileService } from "@/feature/brand-profile/service/bp.service.ts"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"
import { toast } from "sonner"

const useCreateBrandProfile = () => {
  const { setShowBrandProfileOnboarding, setBrandProfile } =
    useBrandProfileStore()

  const brandProfileCreationForm = useForm<BrandProfileCreationDTO>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      bio_context: "",
      tone_guidelines: "",
      website_url: "",
    },
    resolver: zodResolver(BrandProfileSchema),
  })

  const { isLoading: isCreatingBrandProfile, mutateAsync } = useMutation(
    "create-brand-profile",
    async (data: BrandProfileCreationDTO) => {
      return BrandProfileService.createBrandProfile(data)
    },
    {
      onSuccess: (res) => {
        setBrandProfile(res.data)
        brandProfileCreationForm.reset()
        setShowBrandProfileOnboarding(false)
      },
      onError: (error: IErrorResponseModel) => {
        toast.error(
          error.message || "An error occurred while creating brand profile"
        )
      },
    }
  )

  const createBrandProfileHandler = async () => {
    await brandProfileCreationForm.handleSubmit((data) => mutateAsync(data))()
  }

  console.log("Form Errors:", brandProfileCreationForm.formState.errors)
  console.log("Form Values:", brandProfileCreationForm.getValues())

  return {
    brandProfileCreationForm,
    isCreatingBrandProfile,
    createBrandProfileHandler,
  }
}

export default useCreateBrandProfile
