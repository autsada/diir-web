import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
  CommentPublishInput,
  FetchCommentsByPublishIdInput,
  LikeCommentInput,
} from "./types"

/**
 * Fetch comments by publish id
 */
export const FETCH_COMMENTS_BY_PUBLISH_ID_QUERY = gql`
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
      >(FETCH_COMMENTS_BY_PUBLISH_ID_QUERY, {
        input: data,
      })

    return result?.fetchCommentsByPublishId
  } catch (error) {
    throw error
  }
}

/**
 * Comment on publish / comment
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

/**
 * Like / Undo like comment
 */
export const LIKE_COMMENT_MUTATION = gql`
  mutation LikeComment($input: LikeCommentInput!) {
    likeComment(input: $input) {
      status
    }
  }
`
export async function likeComment({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: LikeCommentInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"likeComment">,
        MutationArgsType<"likeComment">
      >(LIKE_COMMENT_MUTATION, {
        input: data,
      })

    return result?.likeComment
  } catch (error) {
    throw error
  }
}

/**
 * Dislike / Undo dislike comment
 */
export const DISLIKE_COMMENT_MUTATION = gql`
  mutation DisLikeComment($input: LikeCommentInput!) {
    disLikeComment(input: $input) {
      status
    }
  }
`
export async function disLikeComment({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: LikeCommentInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"disLikeComment">,
        MutationArgsType<"disLikeComment">
      >(DISLIKE_COMMENT_MUTATION, {
        input: data,
      })

    return result?.disLikeComment
  } catch (error) {
    throw error
  }
}
