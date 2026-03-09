import useUpdateUser from "@/feature/user/hooks/use-update-user.ts"
import CustomTextInput from "@/core/components/custom-components/form/custom-text-input.tsx"
import { Button } from "@/core/components/ui/button.tsx"
import { Save } from "lucide-react"

function ProfileTab() {
  const { updateUserForm, updateUserHandler, isUpdatingUser } = useUpdateUser()
  return (
    <div className="space-y-6">
      <div>
        <div>
          <h3 className="mb-4 text-xl font-medium text-foreground">
            Profile Information
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Update your account&#39;s profile information
          </p>
        </div>
        <div className="space-y-4">
          <CustomTextInput
            id="name"
            formController={updateUserForm}
            label="Display Name"
            disabled={isUpdatingUser}
          />
          <CustomTextInput
            id="email"
            formController={updateUserForm}
            label="Email"
            disabled
          />
        </div>
      </div>
      <Button
        size="sm"
        className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={updateUserHandler}
        disabled={isUpdatingUser}
      >
        <Save className="h-3.5 w-3.5" />
        {isUpdatingUser ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}

export default ProfileTab
