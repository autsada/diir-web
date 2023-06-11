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
  UpdatePlaylistNameInput,
  DeletePlaylistInput,
} from "./types"

/**
 * Fetch user's playlists
 */
export const FETCH_PREVIEW_PLAYLISTS_QUERY = gql`
  query FetchPreviewPlaylists($input: FetchMyPlaylistsInput!) {
    fetchPreviewPlaylists(input: $input) {
      pageInfo {
        count
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          name
          count
          lastItem {
            id
            title
            thumbSource
            thumbnail
            kind
            playback {
              thumbnail
            }
          }
        }
      }
    }
  }
`
export async function fetchPreviewPlaylists({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: FetchMyPlaylistsInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        QueryReturnType<"fetchPreviewPlaylists">,
        QueryArgsType<"fetchPreviewPlaylists">
      >(FETCH_PREVIEW_PLAYLISTS_QUERY, {
        input: data,
      })

    return result?.fetchPreviewPlaylists
  } catch (error) {
    throw error
  }
}

/**
 * Fetch user's playlists
 */
export const FETCH_MY_PLAYLISTS_QUERY = gql`
  query FetchMyPlaylists($input: FetchMyPlaylistsInput!) {
    fetchMyPlaylists(input: $input) {
      pageInfo {
        endCursor
        hasNextPage
        count
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
  try {
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
  } catch (error) {
    throw error
  }
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
  try {
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
  } catch (error) {
    throw error
  }
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
  try {
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
  } catch (error) {
    throw error
  }
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
  try {
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
  } catch (error) {
    throw error
  }
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
  try {
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
  } catch (error) {
    throw error
  }
}

/**
 * Update playlist's name
 */
export const UPDATE_PLAYLIST_NAME_MUTATION = gql`
  mutation UpdatePlaylistName($input: UpdatePlaylistNameInput!) {
    updatePlaylistName(input: $input) {
      status
    }
  }
`
export async function updatePlaylistName({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: UpdatePlaylistNameInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"updatePlaylistName">,
        MutationArgsType<"updatePlaylistName">
      >(UPDATE_PLAYLIST_NAME_MUTATION, {
        input: data,
      })

    return result?.updatePlaylistName
  } catch (error) {
    throw error
  }
}

/**
 * Delete playlist
 */
export const DELETE_PLAYLIST_MUTATION = gql`
  mutation DeletePlaylist($input: DeletePlaylistInput!) {
    deletePlaylist(input: $input) {
      status
    }
  }
`
export async function deletePlaylist({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: DeletePlaylistInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"deletePlaylist">,
        MutationArgsType<"deletePlaylist">
      >(DELETE_PLAYLIST_MUTATION, {
        input: data,
      })

    return result?.deletePlaylist
  } catch (error) {
    throw error
  }
}
