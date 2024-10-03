import { clerkClient, getAuth } from "@clerk/tanstack-start/server"
import { createServerFn } from "@tanstack/start"
import { create } from "ronin"

export const sendFeedbackFn = createServerFn(
  "POST",
  async (data: { content: string }, { request }) => {
    const auth = await getAuth(request)

    if (!auth.userId) {
      throw new Error("Unauthorized")
    }

    const user = await clerkClient({
      telemetry: { disabled: true },
    }).users.getUser(auth.userId)

    await create.feedback.with({
      message: data.content,
      emailFrom: user.emailAddresses[0].emailAddress,
    })
  },
)
