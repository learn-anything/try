import { SignIn } from "@clerk/tanstack-start"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import { ThemeProvider } from "next-themes"
import { cn } from "~/lib/utils"

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
      <div className={cn("h-full w-full font-sans antialiased")}>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}
