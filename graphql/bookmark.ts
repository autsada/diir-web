import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
  BookmarkPostInput,
} from "./types"

/**
 * Bookmark a post
 */
export const BOOKMARK_MUTATION = gql`
  mutation BookmarkPost($input: BookmarkPostInput!) {
    bookmarkPost(input: $input) {
      status
    }
  }
`
export async function bookmark({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: BookmarkPostInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"bookmarkPost">,
        MutationArgsType<"bookmarkPost">
      >(BOOKMARK_MUTATION, {
        input,
      })

    return result?.bookmarkPost
  } catch (error) {
    throw error
  }
}
