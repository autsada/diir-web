import { NextResponse } from "next/server"

import { validateStationDisplayName } from "@/graphql"

export async function POST(req: Request) {
  const { name } = (await req.json()) as { name: string }
  const valid = await validateStationDisplayName(name)

  return NextResponse.json({ valid })
}
