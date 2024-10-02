import { createJazzReactApp } from "jazz-react"
import { LaAccount } from "@/lib/schema"
import { useJazzClerkAuth } from "jazz-react-auth-clerk"
import { useAuth, useClerk } from "@clerk/tanstack-start"
import { useLocation } from "@tanstack/react-router"
import { getEnvVariable } from "../utils"

const Jazz = createJazzReactApp({
  AccountSchema: LaAccount,
})

export const { useAccount, useAccountOrGuest, useCoState, useAcceptInvite } =
  Jazz

function assertPeerUrl(
  url: string | undefined,
): asserts url is `wss://${string}` | `ws://${string}` {
  if (!url) {
    throw new Error("JAZZ_PEER_URL is not defined")
  }
  if (!url.startsWith("wss://") && !url.startsWith("ws://")) {
    throw new Error("JAZZ_PEER_URL must start with wss:// or ws://")
  }
}

const rawUrl = getEnvVariable("VITE_JAZZ_PEER_URL")
assertPeerUrl(rawUrl)
const JAZZ_PEER_URL = rawUrl

interface ChildrenProps {
  children: React.ReactNode
}

export function JazzAndAuth({ children }: ChildrenProps) {
  const { pathname } = useLocation()
  return pathname === "/" ? (
    <JazzGuest>{children}</JazzGuest>
  ) : (
    <JazzAuth>{children}</JazzAuth>
  )
}

export function JazzAuth({ children }: ChildrenProps) {
  const clerk = useClerk()
  const { isLoaded } = useAuth()
  const [authMethod] = useJazzClerkAuth(clerk)

  if (!isLoaded) return null

  return (
    <Jazz.Provider auth={authMethod || "guest"} peer={JAZZ_PEER_URL}>
      {children}
    </Jazz.Provider>
  )
}

export function JazzGuest({ children }: ChildrenProps) {
  return (
    <Jazz.Provider auth="guest" peer={JAZZ_PEER_URL}>
      {children}
    </Jazz.Provider>
  )
}
