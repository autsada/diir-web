import { NextResponse } from "next/server"
import { redirect } from "next/navigation"

import { fetchMyPublishes, getStationById } from "@/graphql"
import { getAccount } from "@/lib/server"
import type { QueryPublishKind } from "@/graphql/types"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken
  const signature = data?.signature

  if (!idToken) {
    redirect("/")
  }

  if (!account?.defaultStation) {
    redirect("/station")
  }

  // Query station by id
  const station = await getStationById(account?.defaultStation?.id)

  if (!station) {
    redirect("/settings")
  }

  const { kind, cursor } = (await req.json()) as {
    kind: QueryPublishKind
    cursor?: string
  }

  const result = await fetchMyPublishes({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      creatorId: station.id,
      kind,
      cursor,
    },
  })

  return NextResponse.json({ result })
}
