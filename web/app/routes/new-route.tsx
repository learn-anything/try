import { createFileRoute } from "@tanstack/react-router"

function RouteComponent() {
  return <></>
}

export const Route = createFileRoute("/new-route")({
  component: () => <RouteComponent />,
})
