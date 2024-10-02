import { SignIn } from "@clerk/tanstack-start"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import { ThemeProvider } from "next-themes"
import { Sidebar } from "~/components/sidebar/sidebar"
import { cn } from "~/lib/utils"
import { Provider as JotaiProvider } from "jotai"
import { TooltipProvider } from "~/components/ui/tooltip"
import { JazzAndAuth } from "~/lib/providers/jazz-provider"

export const Route = createFileRoute("/_pages")({
  beforeLoad: ({ context }) => {
    if (!context.user.userId) {
      throw new Error("Not authenticated")
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === "Not authenticated") {
      return (
        <div className="flex items-center justify-center p-12">
          <SignIn routing="hash" forceRedirectUrl={window.location.href} />
        </div>
      )
    }

    throw error
  },
  component: PagesLayoutComponent,
})

function PagesLayoutComponent() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <JotaiProvider>
        <TooltipProvider>
          <JazzAndAuth>
            <div className={cn("h-full w-full font-sans antialiased")}>
              <div className="flex h-full min-h-full w-full flex-row items-stretch overflow-hidden">
                <Sidebar />

                <div className="relative flex min-w-0 flex-1 flex-col">
                  <main className="relative flex flex-auto flex-col place-items-stretch overflow-auto lg:my-2 lg:mr-2 lg:rounded-md lg:border">
                    <Outlet />
                  </main>
                </div>
              </div>
            </div>
          </JazzAndAuth>
        </TooltipProvider>
      </JotaiProvider>
    </ThemeProvider>
  )
}
