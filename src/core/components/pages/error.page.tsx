import { Button } from "@/core/components/ui/button.tsx"
import { isRouteErrorResponse, useRouteError } from "react-router-dom"

function ErrorPage() {
  const error = useRouteError()

  let errorMessage: string
  let status: number

  if (isRouteErrorResponse(error)) {
    status = error.status
    errorMessage = error.data?.message || error.statusText
  } else if (error instanceof Error) {
    status = 500
    errorMessage = error.message
  } else {
    status = 500
    errorMessage = "An unexpected error occurred"
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-primary text-primary-foreground">
      <h1 className="text-6xl font-black">{status}</h1>
      <p className="text-lg">An error occurred while loading the page</p>
      <p className="text-md text-muted-foreground">
        Details: {status}:{errorMessage}
      </p>
      <Button>
        <a href="/">Go back to Home</a>
      </Button>
    </div>
  )
}

export default ErrorPage
