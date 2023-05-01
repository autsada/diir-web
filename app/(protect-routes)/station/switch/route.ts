import { NextResponse } from "next/server"

import { cookies } from "next/headers"
import { cacheLoggedInSession } from "@/graphql"

export async function POST(req: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("dtoken")

  if (!token || !token.value) throw new Error("Unauthenticated")
  const values = token.value.split("  :::")
  const idToken = values[0]

  const { address, stationId } = (await req.json()) as {
    address: string
    stationId: string
  }

  const result = await cacheLoggedInSession({
    idToken,
    address,
    stationId,
  })
  return NextResponse.json(result)
}
