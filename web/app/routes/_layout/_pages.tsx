import { Outlet, createFileRoute } from "@tanstack/react-router"
import { Sidebar } from "~/components/sidebar/sidebar"
import { TooltipProvider } from "~/components/ui/tooltip"
import { JazzAndAuth } from "~/lib/providers/jazz-provider"
import { Provider as JotaiProvider } from "jotai"

export const Route = createFileRoute("/_layout/_pages")({
  component: PagesLayoutComponent,
})

function PagesLayoutComponent() {
  return (
    <JotaiProvider>
      <TooltipProvider>
        <JazzAndAuth>
          <div className="flex h-full min-h-full w-full flex-row items-stretch overflow-hidden">
            <Sidebar />

            <div className="relative flex min-w-0 flex-1 flex-col">
              <main className="relative flex flex-auto flex-col place-items-stretch overflow-auto lg:my-2 lg:mr-2 lg:rounded-md lg:border">
                <Outlet />
              </main>
            </div>
          </div>
        </JazzAndAuth>
      </TooltipProvider>
    </JotaiProvider>
  )
}
