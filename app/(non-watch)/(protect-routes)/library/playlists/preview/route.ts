import { NextResponse } from "next/server"

import { fetchPreviewPlaylists } from "@/graphql"
import { getAccount } from "@/lib/server"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!account || !account?.defaultStation || !idToken)
    throw new Error("Please sign in to proceed.")

  const { cursor } = (await req.json()) as { cursor: string }

  // Fetch user's playlists
  const playlistsResult = await fetchPreviewPlaylists({
    idToken: idToken!,
    signature,
    data: {
      accountId: account!.id,
      stationId: account?.defaultStation?.id,
      owner: account!.owner,
      cursor,
    },
  })

  return NextResponse.json({ result: playlistsResult })
}
