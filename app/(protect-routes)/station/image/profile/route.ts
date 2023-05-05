import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getMyAccount, updateStationImage } from "@/graphql"
import type { Account } from "@/graphql/types"

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

  const { image, stationId } = (await req.json()) as {
    image: string
    stationId: string
  }
  if (!image) throw new Error("Name is required")
  if (!stationId) throw new Error("Token id is required")

  // Update station image in the database
  const result = await updateStationImage({
    idToken,
    image,
    accountId: account.id,
    owner: account.owner,
    stationId,
    signature,
  })

  return NextResponse.json(result)
}
