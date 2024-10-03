import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/_pages/_protected/testing")({
  component: () => <div>Hello /_topic/testing!</div>,
})
