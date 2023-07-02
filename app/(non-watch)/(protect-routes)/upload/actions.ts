"use server"

import { revalidatePath } from "next/cache"

import { updateBlog } from "@/graphql"
import { getAccount } from "@/lib/server"
import type { UpdateBlogInput } from "@/graphql/types"

export async function saveBlogPost({
  publishId,
  title,
  imageUrl,
  imageRef,
  filename,
  tags,
  content,
  visibility,
}: Pick<
  UpdateBlogInput,
  | "publishId"
  | "title"
  | "imageUrl"
  | "imageRef"
  | "filename"
  | "tags"
  | "content"
  | "visibility"
>) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    const station = account?.defaultStation
    if (!account || !station || !idToken)
      throw new Error("Please sign in to proceed.")

    await updateBlog({
      idToken,
      signature,
      input: {
        creatorId: station.id,
        accountId: account.id,
        owner: account.owner,
        publishId,
        title,
        imageUrl,
        imageRef,
        filename,
        tags,
        content: content ? JSON.parse(content) : null,
        visibility,
      },
    })

    // Revalidate page
    revalidatePath(`/upload`)
    revalidatePath(`/upload/publishes`)
  } catch (error) {
    console.error(error)
  }
}
