import * as React from "react"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useConfirm } from "@omit/react-confirm-dialog"
import { useLocation } from "@tanstack/react-router"
import { isExistingUserFn } from "~/actions"
import { useUser } from "@clerk/tanstack-start"

const hasVisitedAtom = atomWithStorage("hasVisitedLearnAnything", false)

export function Onboarding() {
  const { pathname } = useLocation()
  const [hasVisited, setHasVisited] = useAtom(hasVisitedAtom)
  const [isFetching, setIsFetching] = React.useState(true)
  const confirm = useConfirm()
  const { isLoaded, isSignedIn } = useUser()

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const existingUser = await isExistingUserFn()
        showOnboardingDialog(existingUser)
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsFetching(false)
      }
    }

    if (!hasVisited && pathname !== "/" && isLoaded && isSignedIn) {
      loadUser()
    }
  }, [hasVisited, pathname, isLoaded, isSignedIn])

  const showOnboardingDialog = async (isExistingUser: boolean) => {
    const result = await confirm({
      title: "Welcome to Learn Anything!",
      alertDialogDescription: {
        asChild: true,
      },
      description: (
        <div className="prose text-muted-foreground">
          {isExistingUser && (
            <>
              <p>Existing Customer Notice</p>
              <p>
                We noticed you are an existing Learn Anything customer. We
                sincerely apologize for any broken experience you may have
                encountered on the old website. We've been working hard on this
                new version, which addresses previous issues and offers more
                features. As an early customer, you're locked in at the{" "}
                <strong>$3</strong> price for our upcoming pro version. Thank
                you for your support!
              </p>
            </>
          )}
          <p>
            Learn Anything is a learning platform that organizes knowledge in a
            social way. You can create pages, add links, track learning status
            of any topic, and more things in the future.
          </p>
          <p>
            Try do these quick onboarding steps to get a feel for the product:
          </p>
          <ul>
            <li>Create your first page</li>
            <li>Add a link to a resource</li>
            <li>Update your learning status on a topic</li>
          </ul>
          <p>
            If you have any questions, don't hesitate to reach out. Click on
            question mark button in the bottom right corner and enter your
            message.
          </p>
        </div>
      ),
      cancelButton: {
        variant: "outline",
      },
      confirmText: "Get Started",
      cancelText: "Close",
      alertDialogContent: {
        className: "max-w-xl",
      },
    })

    if (result) {
      setHasVisited(true)
    } else {
      setHasVisited(true)
    }
  }

  if (hasVisited || isFetching) return null

  return null
}

export default Onboarding
