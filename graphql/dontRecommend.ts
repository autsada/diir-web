import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  MutationArgsType,
  MutationReturnType,
  DontRecommendInput,
  FetchDontRecommendsInput,
} from "./types"

/**
 * Fetch user's dont-recommended list
 */
export const FETCH_DONT_RECOMMEND_QUERY = gql`
  query FetchDontRecommends($input: FetchDontRecommendsInput!) {
    fetchDontRecommends(input: $input) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          requestorId
          targetId
          createdAt
          target {
            id
            name
            image
          }
        }
      }
    }
  }
`
export async function fetchDontRecommends({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: FetchDontRecommendsInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        QueryReturnType<"fetchDontRecommends">,
        QueryArgsType<"fetchDontRecommends">
      >(FETCH_DONT_RECOMMEND_QUERY, {
        input: data,
      })

    return result?.fetchDontRecommends
  } catch (error) {
    throw error
  }
}

/**
 * Don't recommend station
 */
export const DONT_RECOMMEND_MUTATION = gql`
  mutation DontRecommend($input: DontRecommendInput!) {
    dontRecommend(input: $input) {
      status
    }
  }
`
export async function dontRecommend({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: DontRecommendInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"dontRecommend">,
        MutationArgsType<"dontRecommend">
      >(DONT_RECOMMEND_MUTATION, {
        input: data,
      })

    return result?.dontRecommend
  } catch (error) {
    throw error
  }
}

/**
 * Remove don't-recommended station from the list
 */
export const REMOVE_DONT_RECOMMEND_MUTATION = gql`
  mutation RemoveDontRecommend($input: DontRecommendInput!) {
    removeDontRecommend(input: $input) {
      status
    }
  }
`
export async function undoDontRecommended({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: DontRecommendInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"removeDontRecommend">,
        MutationArgsType<"removeDontRecommend">
      >(REMOVE_DONT_RECOMMEND_MUTATION, {
        input: data,
      })

    return result?.removeDontRecommend
  } catch (error) {
    throw error
  }
}
