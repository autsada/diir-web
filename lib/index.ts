import { cookies } from "next/headers"

import { createAccount, getMyAccount } from "@/graphql"

export async function getAccount() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("dtoken")

    if (!token || !token.value) return null
    const values = token.value.split("  :::")
    const idToken = values[0]
    const message = values[1]

    const data = await getMyAccount(idToken, message)

    // If no account found, create a new account
    if (!data?.account) {
      data.account = await createAccount(idToken)
    }

    return data
  } catch (error) {
    return null
  }
}
