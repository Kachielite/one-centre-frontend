import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/core/components/ui/field.tsx"
import { cn } from "@/core/lib/utils.ts"
import { Button } from "@/core/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card.tsx"
import type { ComponentProps } from "react"
import useLogin from "@/feature/auth/hooks/use-login.ts"
import CustomTextInput from "@/core/components/custom-components/form/custom-text-input.tsx"
import { Link } from "react-router-dom"
import useSocialLogin from "@/feature/auth/hooks/use-social-login.ts"
import { GoogleLogin } from "@react-oauth/google"

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const { isLoggingIn, loginForm, loginHandler } = useLogin()
  const { handleGoogleCredentialResponse } = useSocialLogin()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await loginHandler()
            }}
          >
            <FieldGroup>
              <Field>
                <div className="relative w-full">
                  {/* Custom styled button visible to the user */}
                  <Button
                    variant="outline"
                    type="button"
                    className="pointer-events-none w-full"
                    tabIndex={-1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                  {/* GoogleLogin iframe overlay: nearly invisible but still clickable (cross-origin iframes need >0 opacity) */}
                  <div
                    className="absolute inset-0 z-10 overflow-hidden"
                    style={{ opacity: 0.01 }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: "scale(10)",
                        transformOrigin: "center center",
                      }}
                    >
                      <GoogleLogin
                        onSuccess={handleGoogleCredentialResponse}
                        onError={() => {
                          console.error("Google login failed")
                        }}
                        size="large"
                        width="400"
                      />
                    </div>
                  </div>
                </div>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <CustomTextInput
                id="email"
                formController={loginForm}
                label="Email"
                disabled={isLoggingIn}
                placeholder="m@example.com"
              />
              <CustomTextInput
                id="password"
                formController={loginForm}
                label="Password"
                type="password"
                disabled={isLoggingIn}
                placeholder="********"
              />
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                <Link
                  to="/forget-password"
                  className="ml-auto text-xs text-primary underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </FieldSeparator>
              <Field>
                <Button disabled={isLoggingIn} type="submit">
                  {isLoggingIn ? "Logging in" : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/verify-email">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
