"use server"

import { revalidatePath } from "next/cache"

import { updateVideo, updateBlog } from "@/graphql"
import { getAccount } from "@/lib/server"
import type { UpdateBlogInput, UpdateVideoInput } from "@/graphql/types"

export async function saveVideo(
  input: Omit<UpdateVideoInput, "accountId" | "owner" | "creatorId">
) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    const station = account?.defaultStation
    if (!account || !station || !idToken)
      throw new Error("Please sign in to proceed.")

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
      tags,
    } = input

    await updateVideo({
      idToken,
      signature,
      input: {
        accountId: account.id,
        owner: account.owner,
        creatorId: station.id,
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
        tags,
      },
    })

    // Revalidate page
    revalidatePath(`/upload/[id]`)
    revalidatePath(`/upload/publishes`)
    revalidatePath(`/upload/publishes/[kind]`)
  } catch (error) {
    console.error(error)
  }
}

export async function saveBlogPost({
  publishId,
  title,
  imageUrl,
  imageRef,
  filename,
  primaryCategory,
  secondaryCategory,
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
  | "primaryCategory"
  | "secondaryCategory"
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
        primaryCategory,
        secondaryCategory,
        tags,
        content: content ? JSON.parse(content) : null,
        visibility,
      },
    })

    // Revalidate page
    revalidatePath(`/upload/[id]`)
    revalidatePath(`/upload/publishes`)
    revalidatePath(`/upload/publishes/[kind]`)
  } catch (error) {
    console.error(error)
  }
}
