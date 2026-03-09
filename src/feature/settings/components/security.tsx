import useUpdateUser from "@/feature/user/hooks/use-update-user.ts"
import CustomTextInput from "@/core/components/custom-components/form/custom-text-input.tsx"
import { Button } from "@/core/components/ui/button.tsx"
import { Save } from "lucide-react"

function SecurityTab() {
  const { updateUserForm, updateUserHandler, isUpdatingUser } = useUpdateUser()
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium text-foreground">
          Security Settings
        </h3>
        <div className="space-y-4">
          <CustomTextInput
            id="old_password"
            formController={updateUserForm}
            label="Current Password"
            type="password"
            disabled={isUpdatingUser}
          />
          <CustomTextInput
            id="password"
            formController={updateUserForm}
            label="New Password"
            type="password"
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

export default SecurityTab
