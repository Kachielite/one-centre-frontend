import { Button } from "@/core/components/ui/button.tsx"

function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <h1 className="text-6xl font-black lg:text-[12rem]">404</h1>
      <p className="text-lg">
        Oops! The page you&#39;re looking for doesn&#39;t exist.
      </p>
      <Button>
        <a href="/">Go back to Home</a>
      </Button>
    </div>
  )
}

export default NotFoundPage
