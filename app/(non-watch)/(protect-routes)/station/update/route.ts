import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getMyAccount, updateStationName } from "@/graphql"
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

  const { name, stationId } = (await req.json()) as {
    name: string
    stationId: string
  }
  if (!name) throw new Error("Name is required")
  if (!stationId) throw new Error("Token id is required")

  // Update station name in the database
  const result = await updateStationName({
    idToken,
    name,
    accountId: account.id,
    owner: account.owner,
    stationId,
    signature,
  })

  return NextResponse.json(result)
}
