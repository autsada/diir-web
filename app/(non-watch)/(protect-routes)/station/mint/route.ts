import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getMyAccount, mintFirstStationNFT, mintStationNFT } from "@/graphql"
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

    const { name } = (await req.json()) as { name: string }
    if (!name) throw new Error("Name is required")

    // 1. Mint Station NFT
    let tokenId: number | undefined = undefined

    if (account.stations.length === 0) {
      const data = await mintFirstStationNFT({
        idToken,
        signature,
        to: account.owner,
        name,
        accountId: account.id,
      })
      tokenId = data?.tokenId
    } else {
      const data = await mintStationNFT({
        idToken,
        signature,
        to: account.owner,
        name,
        accountId: account.id,
      })
      tokenId = data?.tokenId
    }

    if (!tokenId || typeof tokenId !== "number")
      throw new Error("Mint station NFT failed")

    return NextResponse.json({ tokenId })
  } catch (error) {
    throw error
  }
}
