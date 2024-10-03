import { clerkClient, getAuth } from "@clerk/tanstack-start/server"
import { createServerFn } from "@tanstack/start"
import { create, get } from "ronin"

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

export const isExistingUserFn = createServerFn(
  "GET",
  async (_, { request }) => {
    const auth = await getAuth(request)

    if (!auth.userId) {
      throw new Error("Unauthorized")
    }

    const user = await clerkClient({
      telemetry: { disabled: true },
    }).users.getUser(auth.userId)

    const roninUser = await get.existingStripeSubscriber.with({
      email: user.emailAddresses[0].emailAddress,
    })

    return user.emailAddresses[0].emailAddress === roninUser?.email
  },
)
