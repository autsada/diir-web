import { NextResponse } from "next/server"

import { getUploadedPublish } from "@/graphql"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) throw new Error("Bad input")

  const publish = await getUploadedPublish(id)

  return NextResponse.json(publish)
}
