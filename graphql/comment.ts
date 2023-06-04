import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
  CommentPublishInput,
} from "./types"

/**
 * DisLike / Undo disLike pubulish
 */
export const COMMENT_MUTATION = gql`
  mutation Comment($input: CommentPublishInput!) {
    comment(input: $input) {
      status
    }
  }
`
export async function commentPublish({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: CommentPublishInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<MutationReturnType<"comment">, MutationArgsType<"comment">>(
        COMMENT_MUTATION,
        {
          input: data,
        }
      )

    return result?.comment
  } catch (error) {
    throw error
  }
}
