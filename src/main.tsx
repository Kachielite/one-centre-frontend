import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/core/components/theme-provider.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "sonner"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  </ThemeProvider>
)
