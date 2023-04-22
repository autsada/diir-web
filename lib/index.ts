import { cookies } from "next/headers"

import { getMyAccount } from "@/graphql"

export async function getAccount() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("dtoken")

    if (!token || !token.value) return null
    const values = token.value.split("  :::")
    const idToken = values[0]
    const address = values[1]

    const data = await getMyAccount(idToken, address)

    return data
  } catch (error) {
    return null
  }
}
