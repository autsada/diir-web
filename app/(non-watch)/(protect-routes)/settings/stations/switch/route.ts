import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import { cacheLoggedInSession, getMyAccount } from "@/graphql"
import type { Account } from "@/graphql/codegen/graphql"

export async function POST(req: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("dtoken")

  if (!token || !token.value) return null
  const idToken = token.value
  if (!idToken) throw new Error("Unauthenticated")

  const signedMessage = cookieStore.get("dsignature")
  const signature = signedMessage?.value

  // Get an account
  const account = (await getMyAccount(idToken, signature)) as Account
  if (!account) throw new Error("No account found")

  const { address, stationId } = (await req.json()) as {
    address: string
    stationId: string
  }

  const result = await cacheLoggedInSession({
    idToken,
    signature,
    input: {
      address,
      stationId,
      accountId: account.id,
    },
  })
  return NextResponse.json(result)
}
