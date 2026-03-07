import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/core/components/theme-provider.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "sonner"
import { GoogleOAuthProvider } from "@react-oauth/google"
import ENV from "@/core/constants/env.constant.ts"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
)
