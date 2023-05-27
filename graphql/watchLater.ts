import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  FetchWatchLaterInput,
  AddToPlayListInput,
  MutationArgsType,
  MutationReturnType,
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
}

/**
 * Add publish to watch later
 */
export const ADD_TO_WATCH_LATER_MUTATION = gql`
  mutation AddToWatchLater($input: SavePublishToPlayListInput!) {
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
  data: AddToPlayListInput
}) {
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
}
