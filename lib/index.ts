import { cookies } from "next/headers"

import { createAccount, getMyAccount } from "@/graphql"
import type { Account } from "@/types"

export async function getAccount() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("dtoken")

    if (!token || !token.value) return null
    const values = token.value.split("  :::")
    const idToken = values[0]
    const message = values[1]

    let account = (await getMyAccount(idToken, message)) as Account

    // If no account found, create a new account
    if (!account) {
      account = (await createAccount(idToken)) as Account
    }

    return account
  } catch (error) {
    return null
  }
}
