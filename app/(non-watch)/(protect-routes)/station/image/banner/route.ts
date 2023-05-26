import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getMyAccount, updateStationBannerImage } from "@/graphql"
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

  const { image, imageRef, stationId } = (await req.json()) as {
    image: string
    imageRef: string
    stationId: string
  }
  if (!image || !imageRef) throw new Error("Image is required")
  if (!stationId) throw new Error("Station id is required")

  // Update station image in the database
  const result = await updateStationBannerImage({
    idToken,
    image,
    imageRef,
    accountId: account.id,
    owner: account.owner,
    stationId,
    signature,
  })

  return NextResponse.json(result)
}
