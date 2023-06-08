import { NextResponse } from "next/server"

import { fetchSuggestedVideos } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account

  const { cursor, publishId } = (await req.json()) as {
    cursor: string
    publishId: string
  }

  if (!publishId) return NextResponse.json({ result: null })

  // Fetch suggested videos
  const suggestedResult = await fetchSuggestedVideos({
    requestorId: account?.defaultStation ? account.defaultStation.id : null,
    cursor,
    publishId,
  })

  return NextResponse.json({ result: suggestedResult })
}
