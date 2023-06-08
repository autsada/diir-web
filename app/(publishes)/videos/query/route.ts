import { NextResponse } from "next/server"
import type { Maybe } from "graphql/jsutils/Maybe"

import {
  fetchAllVideos,
  fetchVideosByCategory,
  getStationById,
} from "@/graphql"
import { getAccount } from "@/lib/server"
import type { PublishCategory } from "@/graphql/types"
import type { FetchPublishesResponse } from "@/graphql/codegen/graphql"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken

  // Query station by id
  const station =
    !account || !idToken || !account.defaultStation
      ? undefined
      : await getStationById(account?.defaultStation?.id)
  const requestorId = station?.id

  const { category, cursor } = (await req.json()) as {
    category: PublishCategory | "All"
    cursor?: string
  }

  let result: Maybe<FetchPublishesResponse> | undefined = undefined

  if (category === "All") {
    result = await fetchAllVideos({ requestorId, cursor })
  } else {
    result = await fetchVideosByCategory({ requestorId, category, cursor })
  }

  return NextResponse.json({ result })
}
