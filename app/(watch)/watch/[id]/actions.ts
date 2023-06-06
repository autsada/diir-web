"use server"

import { revalidatePath } from "next/cache"

import { commentPublish, disLike, like, likeComment } from "@/graphql"
import { getAccount } from "@/lib/server"

/**
 * @param publishId An id of the publish to be liked
 */
export async function likePublish(publishId: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!publishId) throw new Error("Bad input")

    await like({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        publishId,
      },
    })

    // Revalidate the watch page
    revalidatePath(`/watch/[id]`)
  } catch (error) {
    throw error
  }
}

/**
 * @param publishId An id of the publish to be liked
 */
export async function disLikePublish(publishId: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!publishId) throw new Error("Bad input")

    await disLike({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        publishId,
      },
    })

    // Revalidate the watch page
    revalidatePath(`/watch/[id]`)
  } catch (error) {
    throw error
  }
}

export async function commentOnPublish(content: string, publishId: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!content || !publishId) throw new Error("Bad input")

    await commentPublish({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        publishId,
        content,
        commentType: "PUBLISH",
      },
    })

    // Revalidate the watch page
    revalidatePath(`/watch/[id]`)
  } catch (error) {
    throw error
  }
}

export async function commentOnComment(
  content: string,
  publishId: string,
  commentId: string
) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!content || !publishId || !commentId) throw new Error("Bad input")

    await commentPublish({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        publishId,
        content,
        commentType: "COMMENT",
        commentId,
      },
    })

    // Revalidate the watch page
    revalidatePath(`/watch/[id]`)
  } catch (error) {
    throw error
  }
}

/**
 * @param publishId An id of the publish that the comment belongs to
 * @param commentId An id of the comment to be liked
 */
export async function likePublishComment(publishId: string, commentId: string) {
  try {
    const data = await getAccount()
    const account = data?.account
    const idToken = data?.idToken
    const signature = data?.signature
    if (!account || !account?.defaultStation || !idToken)
      throw new Error("Please sign in to proceed.")

    if (!publishId || !commentId) throw new Error("Bad input")

    await likeComment({
      idToken,
      signature,
      data: {
        accountId: account.id,
        owner: account.owner,
        stationId: account.defaultStation?.id,
        publishId,
        commentId,
      },
    })

    // Revalidate the watch page
    revalidatePath(`/watch/[id]`)
  } catch (error) {
    throw error
  }
}
