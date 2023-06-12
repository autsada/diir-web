import { NextResponse } from "next/server"

import { fetchPlaylistItems } from "@/graphql"
import { getAccount } from "@/lib/server"
import type { PlaylistOrderBy } from "@/graphql/types"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")
    const { cursor, sortBy } = (await req.json()) as {
      cursor?: string
      sortBy?: PlaylistOrderBy
    }
    // Fetch items from user's watch later list
    const watchLaterResult = await fetchPlaylistItems({
      idToken: idToken!,
      signature,
      data: {
        accountId: account!.id,
        stationId: account?.defaultStation?.id,
        owner: account!.owner,
        playlistId: params.id,
        cursor,
        orderBy: sortBy,
      },
    })
    return NextResponse.json({ result: watchLaterResult })
  } catch (error) {
    console.error(error)
  }
}
