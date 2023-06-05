import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
  CommentPublishInput,
  FetchCommentsByPublishIdInput,
} from "./types"

/**
 * Fetch comments by publish id
 */
export const FETCH_COMMENTS_BY_ID_QUERY = gql`
  query FetchCommentsByPublishId($input: FetchCommentsByPublishIdInput!) {
    fetchCommentsByPublishId(input: $input) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          content
          createdAt
          updatedAt
          creator {
            id
            name
            image
            displayName
            defaultColor
          }
          liked
          likesCount
          disLiked
          commentType
          commentsCount
          comments {
            id
            createdAt
            updatedAt
            content
            creator {
              id
              name
              image
              displayName
              defaultColor
            }
            liked
            disLiked
            likesCount
          }
        }
      }
    }
  }
`
export async function fetchComments(data: FetchCommentsByPublishIdInput) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
      })
      .request<
        QueryReturnType<"fetchCommentsByPublishId">,
        QueryArgsType<"fetchCommentsByPublishId">
      >(FETCH_COMMENTS_BY_ID_QUERY, {
        input: data,
      })

    return result?.fetchCommentsByPublishId
  } catch (error) {
    throw error
  }
}

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
