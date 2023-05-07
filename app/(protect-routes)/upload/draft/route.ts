import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createDraftPublish, getMyAccount } from "@/graphql"
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
  if (!account || !account?.defaultStation)
    throw new Error("No account/station found")

  const { filename } = (await req.json()) as { filename: string }
  if (!filename) throw new Error("Bad input")

  // Create a draft publish in the database
  const result = await createDraftPublish({
    idToken,
    signature,
    owner: account.owner,
    creatorId: account.defaultStation?.id,
    accountId: account.id,
    filename,
  })

  return NextResponse.json(result)
}
