import { NextResponse } from "next/server"

import { fetchComments } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account

  const { cursor, publishId } = (await req.json()) as {
    cursor: string
    publishId: string
  }

  if (!publishId) return NextResponse.json({ result: null })

  // Fetch comments of the publish
  const commentsResult = await fetchComments({
    requestorId: account?.defaultStation?.id,
    publishId,
    cursor,
  })

  return NextResponse.json({ result: commentsResult })
}
