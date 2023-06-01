import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createStation, getMyAccount } from "@/graphql"
import type { Account } from "@/graphql/codegen/graphql"

export async function POST(req: Request) {
  try {
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

    const { name, tokenId } = (await req.json()) as {
      name: string
      tokenId: number
    }
    if (!name) throw new Error("Name is required")
    if (!tokenId) throw new Error("Token id is required")

    // Create station in the database
    const result = await createStation({
      idToken,
      name,
      accountId: account.id,
      owner: account.owner,
      tokenId,
      signature,
    })

    return NextResponse.json(result)
  } catch (error) {
    throw error
  }
}
