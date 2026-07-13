import { createRoot } from "react-dom/client"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RouterProvider } from "react-router"
import router from "@/routes"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@workspace/ui/components/sonner"
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
)
