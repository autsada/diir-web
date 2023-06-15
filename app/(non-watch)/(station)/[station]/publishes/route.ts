import { NextResponse } from "next/server"

import { fetchStationPublishes } from "@/graphql"
import { getAccount } from "@/lib/server"
import type { PublishOrderBy, QueryPublishKind } from "@/graphql/types"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account
  const requestor =
    !account || !account.defaultStation ? undefined : account.defaultStation

  const { creatorId, kind, cursor, sortBy } = (await req.json()) as {
    creatorId: string
    kind?: QueryPublishKind
    cursor?: string
    sortBy?: PublishOrderBy
  }

  // Fetch publishes of the creator
  const fetchResult = await fetchStationPublishes({
    creatorId,
    requestorId: requestor?.id,
    kind,
    cursor,
    orderBy: sortBy,
  })

  return NextResponse.json({ result: fetchResult })
}
