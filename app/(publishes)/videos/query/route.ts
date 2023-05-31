import { NextResponse } from "next/server"
import type { Maybe } from "graphql/jsutils/Maybe"

import { fetchAllVideos, fetchVideosByCategory } from "@/graphql"
import type { PublishCategory } from "@/graphql/types"
import type { FetchPublishesResponse } from "@/graphql/codegen/graphql"

export async function POST(req: Request) {
  const body = (await req.json()) as {
    requestorId: string
    category: PublishCategory | "All"
  }
  const category = body.category
  const requestorId = body.requestorId

  let result: Maybe<FetchPublishesResponse> | undefined = undefined

  if (category === "All") {
    result = await fetchAllVideos({ requestorId })
  } else {
    result = await fetchVideosByCategory({ category, requestorId })
  }

  return NextResponse.json({ result })
}
