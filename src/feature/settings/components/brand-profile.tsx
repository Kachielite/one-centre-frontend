import CustomTextInput from "@/core/components/custom-components/form/custom-text-input.tsx"
import { Button } from "@/core/components/ui/button.tsx"
import { Save } from "lucide-react"
import useUpdateBrandProfile from "@/feature/brand-profile/hooks/use-update-brand-profile.ts"
import CustomTextAreaInput from "@/core/components/custom-components/form/custom-textarea-input.tsx"

function BrandProfileTab() {
  const {
    isUpdatingBrandProfile,
    updateBrandProfileHandler,
    brandProfileUpdateForm,
  } = useUpdateBrandProfile()
  return (
    <div className="space-y-6">
      <div>
        <div>
          <h3 className="mb-4 text-xl font-medium text-foreground">
            Brand Profile Settings
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Update your brand profile information, ensure your brand&#39;s
            identity is accurately represented and up-to-date. This will help
            the AI generate content that is consistent with your brand&#39;s
            voice and style.
          </p>
        </div>
        <div className="space-y-4">
          <CustomTextInput
            id="name"
            formController={brandProfileUpdateForm}
            label="Brand Name"
            disabled={isUpdatingBrandProfile}
          />
          <CustomTextAreaInput
            id="bio_context"
            formController={brandProfileUpdateForm}
            label="Brand Bio/Context"
            disabled={isUpdatingBrandProfile}
          />
          <CustomTextAreaInput
            id="tone_guidelines"
            formController={brandProfileUpdateForm}
            label="Tone Guidelines"
            disabled={isUpdatingBrandProfile}
          />
          <CustomTextInput
            id="website_url"
            formController={brandProfileUpdateForm}
            label="Website URL"
            disabled={isUpdatingBrandProfile}
          />
        </div>
      </div>
      <Button
        size="sm"
        className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={updateBrandProfileHandler}
        disabled={isUpdatingBrandProfile}
      >
        <Save className="h-3.5 w-3.5" />
        {isUpdatingBrandProfile ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}

export default BrandProfileTab
