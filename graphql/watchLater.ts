import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  FetchWatchLaterInput,
  AddToWatchLaterInput,
  MutationArgsType,
  MutationReturnType,
  RemoveFromWatchLaterInput,
} from "./types"
/**
 * Fetch watch later videos of a station
 */
export const FETCH_WATCH_LATER_QUERY = gql`
  query FetchWatchLater($input: FetchWatchLaterInput!) {
    fetchWatchLater(input: $input) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          createdAt
          stationId
          publishId
          publish {
            id
            title
            createdAt
            views
            visibility
            thumbSource
            thumbnail
            primaryCategory
            secondaryCategory
            kind
            creator {
              id
              name
              displayName
              image
              defaultColor
            }
            playback {
              id
              videoId
              duration
              hls
              dash
              thumbnail
            }
          }
        }
      }
    }
  }
`
export async function fetchWatchLater({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: FetchWatchLaterInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        QueryReturnType<"fetchWatchLater">,
        QueryArgsType<"fetchWatchLater">
      >(FETCH_WATCH_LATER_QUERY, {
        input: data,
      })

    return result?.fetchWatchLater
  } catch (error) {
    throw error
  }
}

/**
 * Add a publish to watch later
 */
export const ADD_TO_WATCH_LATER_MUTATION = gql`
  mutation AddToWatchLater($input: AddToWatchLaterInput!) {
    addToWatchLater(input: $input) {
      status
    }
  }
`
export async function addToWatchLater({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: AddToWatchLaterInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"addToWatchLater">,
        MutationArgsType<"addToWatchLater">
      >(ADD_TO_WATCH_LATER_MUTATION, {
        input: data,
      })

    return result?.addToWatchLater
  } catch (error) {
    throw error
  }
}

/**
 * Remove a publish from watch later
 */
export const REMOVE_FROM_WATCH_LATER_MUTATION = gql`
  mutation RemoveFromWatchLater($input: RemoveFromWatchLaterInput!) {
    removeFromWatchLater(input: $input) {
      status
    }
  }
`
export async function removeWatchLater({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: RemoveFromWatchLaterInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"removeFromWatchLater">,
        MutationArgsType<"removeFromWatchLater">
      >(REMOVE_FROM_WATCH_LATER_MUTATION, {
        input: data,
      })

    return result?.removeFromWatchLater
  } catch (error) {
    throw error
  }
}
