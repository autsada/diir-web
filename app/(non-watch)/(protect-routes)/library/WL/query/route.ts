import { NextResponse } from "next/server"

import { fetchWatchLater } from "@/graphql"
import { getAccount } from "@/lib/server"
import type { WatchLaterOrderBy } from "@/graphql/types"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!account || !account?.defaultStation || !idToken)
    throw new Error("Please sign in to proceed.")

  const { cursor, sortBy } = (await req.json()) as {
    cursor?: string
    sortBy?: WatchLaterOrderBy
  }

  // Fetch items from user's watch later list
  const watchLaterResult = await fetchWatchLater({
    idToken: idToken!,
    signature,
    data: {
      accountId: account!.id,
      stationId: account?.defaultStation?.id,
      owner: account!.owner,
      cursor,
      orderBy: sortBy,
    },
  })

  return NextResponse.json({ result: watchLaterResult })
}
