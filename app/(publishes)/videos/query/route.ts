import { NextResponse } from "next/server"
import type { Maybe } from "graphql/jsutils/Maybe"

import { fetchAllVideos, fetchVideosByCategory } from "@/graphql"
import type { PublishCategory } from "@/graphql/types"
import type { FetchPublishesResponse } from "@/graphql/codegen/graphql"

export async function POST(req: Request) {
  const body = (await req.json()) as { category: PublishCategory | "All" }
  const category = body.category

  let result: Maybe<FetchPublishesResponse> | undefined = undefined

  if (category === "All") {
    result = await fetchAllVideos()
  } else {
    result = await fetchVideosByCategory(category)
  }

  return NextResponse.json({ result })
}
