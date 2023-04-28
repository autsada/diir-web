import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  createStation,
  getMyAccount,
  mintFirstStationNFT,
  mintStationNFT,
} from "@/graphql"
import type { Account } from "@/types"

export async function POST(req: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("dtoken")

  if (!token || !token.value) return null
  const values = token.value.split("  :::")
  const idToken = values[0]
  const message = values[1]

  if (!idToken) throw new Error("Unauthenticated")

  // Get an account
  const account = (await getMyAccount(idToken, message)) as Account
  if (!account) throw new Error("No account found")

  const { to, name } = (await req.json()) as { name: string; to: string }

  // 1. Mint Station NFT
  let tokenId: number | undefined = undefined

  if (account.stations.length === 0) {
    const data = await mintFirstStationNFT({ idToken, to, name })
    tokenId = data?.tokenId
  } else {
    const data = await mintStationNFT({ idToken, to, name })
    tokenId = data?.tokenId
  }

  if (!tokenId || typeof tokenId !== "number")
    throw new Error("Mint station NFT failed")

  // 2. Create station in the database
  const result = await createStation({
    idToken,
    name,
    accountId: account.id,
    owner: account.owner,
    tokenId,
    signature: message,
  })

  return NextResponse.json(result)
}
