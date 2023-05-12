import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

import { updatePublish } from "@/graphql"
import { getAccount } from "@/lib/server"
import type { UpdatePublishInput } from "@/graphql/types"

export async function POST(req: Request) {
  const data = await getAccount()
  const account = data?.account
  if (!account || !account?.defaultStation)
    throw new Error("No account/station found.")

  const idToken = data?.idToken
  const signature = data?.signature
  if (!idToken) throw new Error("Please sign in to proceed.")

  const body = (await req.json()) as Omit<
    UpdatePublishInput,
    "accountId" | "owner" | "stationId" | "contentURI" | "contentRef"
  >

  const {
    publishId,
    thumbnail,
    thumbnailRef,
    thumbSource,
    title,
    description,
    primaryCategory,
    secondaryCategory,
    kind,
    visibility,
  } = body
  if (!publishId) throw new Error("Bad input")

  const result = await updatePublish({
    idToken,
    signature,
    data: {
      accountId: account.id,
      owner: account.owner,
      stationId: account.defaultStation.id,
      publishId,
      thumbnail: thumbnail || null,
      thumbnailRef: thumbnailRef || null,
      thumbSource: thumbSource || null,
      title: title || null,
      description: description || null,
      primaryCategory: primaryCategory || null,
      secondaryCategory: secondaryCategory || null,
      kind: kind || null,
      visibility,
    },
  })

  // Revalidate upload page
  revalidatePath(`/upload/${publishId}`)

  return NextResponse.json(result)
}
