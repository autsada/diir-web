import { NextResponse } from "next/server"

import { checkPublishPlaylists } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!account || !account?.defaultStation || !idToken)
    throw new Error("Please sign in to proceed.")

  const { publishId } = (await req.json()) as { publishId: string }
  if (!publishId) throw new Error("Bad input")

  // Get playlist item
  const result = await checkPublishPlaylists({
    idToken,
    signature,
    data: {
      owner: account.owner,
      accountId: account.id,
      stationId: account.defaultStation.id,
      publishId,
    },
  })

  return NextResponse.json({ result })
}
