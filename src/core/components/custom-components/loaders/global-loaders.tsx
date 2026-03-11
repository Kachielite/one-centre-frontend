import { Spinner } from "@/core/components/ui/spinner.tsx"

export function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Spinner className="h-10 w-10 text-primary" />
    </div>
  )
}
