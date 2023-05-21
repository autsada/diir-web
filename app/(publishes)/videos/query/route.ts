import { NextResponse } from "next/server"

import { getAllVideos, getVideosByCategory } from "@/graphql"
import type { Publish, PublishCategory } from "@/graphql/types"

export async function POST(req: Request) {
  const body = (await req.json()) as { category: PublishCategory | "All" }
  const category = body.category

  let publishes: Publish[] = []

  if (category === "All") {
    publishes = (await getAllVideos()) as Publish[]
  } else {
    publishes = (await getVideosByCategory(category)) as Publish[]
  }

  return NextResponse.json({ publishes })
}
