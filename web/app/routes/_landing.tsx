import { Outlet, createFileRoute } from "@tanstack/react-router"
import { ThemeProvider } from "next-themes"
import { cn } from "~/lib/utils"

export const Route = createFileRoute("/_landing")({
  component: LandingLayoutComponent,
})

function LandingLayoutComponent() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={cn("h-full w-full font-sans antialiased")}>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}
