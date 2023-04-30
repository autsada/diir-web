import { NextResponse } from "next/server"

import { validateStationName } from "@/graphql"

export async function POST(req: Request) {
  const { name } = (await req.json()) as { name: string }
  const valid = await validateStationName(name)
  console.log("valid: ", valid)

  return NextResponse.json({ valid })
}
