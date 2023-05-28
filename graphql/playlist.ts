import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryArgsType,
  QueryReturnType,
  MutationReturnType,
  MutationArgsType,
  FetchMyPlaylistsInput,
  CheckPublishPlaylistsInput,
  CreatePlayListInput,
  AddToPlaylistInput,
  UpdatePlaylistsInput,
} from "./types"

/**
 * Fetch user's playlists
 */
export const FETCH_MY_PLAYLISTS_QUERY = gql`
  query FetchMyPlaylists($input: FetchMyPlaylistsInput!) {
    fetchMyPlaylists(input: $input) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          name
          ownerId
          createdAt
        }
      }
    }
  }
`
export async function fetchMyPlaylists({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: FetchMyPlaylistsInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      QueryReturnType<"fetchMyPlaylists">,
      QueryArgsType<"fetchMyPlaylists">
    >(FETCH_MY_PLAYLISTS_QUERY, {
      input: data,
    })

  return result?.fetchMyPlaylists
}

/**
 * Get a playlist item of the user
 */
export const CHECK_PUBLISH_PLAYLISTS_QUERY = gql`
  query CheckPublishPlaylists($input: CheckPublishPlaylistsInput!) {
    checkPublishPlaylists(input: $input) {
      isInWatchLater
      publishId
      items {
        id
        playlist {
          id
          name
        }
      }
    }
  }
`
export async function checkPublishPlaylists({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: CheckPublishPlaylistsInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      QueryReturnType<"checkPublishPlaylists">,
      QueryArgsType<"checkPublishPlaylists">
    >(CHECK_PUBLISH_PLAYLISTS_QUERY, {
      input: data,
    })

  return result?.checkPublishPlaylists
}

/**
 * Add a publish to new playlist
 */
export const ADD_TO_NEW_PLAYLIST_MUTATION = gql`
  mutation AddToNewPlaylist($input: CreatePlayListInput!) {
    addToNewPlaylist(input: $input) {
      status
    }
  }
`
export async function addToNewPlaylist({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: CreatePlayListInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      MutationReturnType<"addToNewPlaylist">,
      MutationArgsType<"addToNewPlaylist">
    >(ADD_TO_NEW_PLAYLIST_MUTATION, {
      input: data,
    })

  return result?.addToNewPlaylist
}

/**
 * Add a publish to playlist
 */
export const ADD_TO_PLAYLIST_MUTATION = gql`
  mutation AddToPlaylist($input: AddToPlayListInput!) {
    addToPlaylist(input: $input) {
      status
    }
  }
`
export async function addToPlaylist({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: AddToPlaylistInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      MutationReturnType<"addToPlaylist">,
      MutationArgsType<"addToPlaylist">
    >(ADD_TO_PLAYLIST_MUTATION, {
      input: data,
    })

  return result?.addToPlaylist
}

/**
 * Update playlists
 */
export const UPDATE_PLAYLISTS_MUTATION = gql`
  mutation UpdatePlaylists($input: UpdatePlaylistsInput!) {
    updatePlaylists(input: $input) {
      status
    }
  }
`
export async function updatePlaylists({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: UpdatePlaylistsInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      MutationReturnType<"updatePlaylists">,
      MutationArgsType<"updatePlaylists">
    >(UPDATE_PLAYLISTS_MUTATION, {
      input: data,
    })

  return result?.updatePlaylists
}
