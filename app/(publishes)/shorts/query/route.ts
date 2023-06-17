import { NextResponse } from "next/server"

import { fetchShorts, getStationById } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken

  const { cursor } = (await req.json()) as {
    cursor?: string
  }

  // Query station by id
  const station =
    !account || !idToken || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)

  // Fetch short videos
  const shortsResult = await fetchShorts({
    cursor,
    requestorId: station?.id,
  })

  return NextResponse.json({ result: shortsResult })
}
