import { NextResponse } from "next/server"

import { validateStationDisplayName } from "@/graphql"

export async function POST(req: Request) {
  try {
    const { name } = (await req.json()) as { name: string }
    const valid = await validateStationDisplayName(name)

    return NextResponse.json({ valid })
  } catch (error) {
    return NextResponse.json({ valid: false })
  }
}
