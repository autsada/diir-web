import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
  GetMyPublishesInput,
  PublishCategory,
  AddToPlayListInput,
  QueryByIdInput,
  GetWatchLaterInput,
  UpdatePublishInput,
} from "./types"

/**
 * Get an uploaded publish for use in the upload action
 */
export const GET_CREATOR_PUBLISH_QUERY = gql`
  query GetPublishForCreator($id: String!) {
    getPublishForCreator(id: $id) {
      id
      creatorId
      title
      description
      primaryCategory
      secondaryCategory
      visibility
      filename
      thumbnail
      thumbnailRef
      thumbSource
      uploading
      uploadError
      transcodeError
      kind
      playback {
        id
        videoId
        thumbnail
        preview
        duration
        dash
        hls
      }
    }
  }
`
export async function getUploadedPublish(id: string) {
  const data = await client.request<
    QueryReturnType<"getPublishForCreator">,
    QueryArgsType<"getPublishForCreator">
  >(GET_CREATOR_PUBLISH_QUERY, { id })

  return data?.getPublishForCreator
}

/**
 * Get creator publishes
 */
export const GET_MY_PUBLISHES_QUERY = gql`
  query GetMyPublishes($input: GetMyPublishesInput!) {
    getMyPublishes(input: $input) {
      id
      createdAt
      contentURI
      contentRef
      filename
      thumbnail
      thumbnailRef
      thumbSource
      title
      description
      views
      commentsCount
      likesCount
      disLikesCount
      uploading
      uploadError
      tipsCount
      visibility
      kind
      playback {
        id
        thumbnail
        duration
      }
    }
  }
`
export async function getMyPublishes({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: GetMyPublishesInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      QueryReturnType<"getMyPublishes">,
      QueryArgsType<"getMyPublishes">
    >(GET_MY_PUBLISHES_QUERY, {
      input: data,
    })

  return result?.getMyPublishes
}

/**
 * Get a publish for watch page
 */
export const GET_WATCHING_PUBLISH_QUERY = gql`
  query GetPublishById($input: QueryByIdInput!) {
    getPublishById(input: $input) {
      id
      title
      description
      createdAt
      primaryCategory
      secondaryCategory
      kind
      creatorId
      creator {
        id
        name
        displayName
        image
        followersCount
        isFollowing
      }
      playback {
        id
        videoId
        duration
        hls
        dash
        thumbnail
      }
      liked
      disLiked
      likesCount
      commentsCount
      comments {
        id
        creator {
          id
          name
          displayName
          image
        }
        content
        liked
        disLiked
        likesCount
        commentType
      }
    }
  }
`
export async function getWatchingPublish(data: QueryByIdInput) {
  const result = await client.request<
    QueryReturnType<"getPublishById">,
    QueryArgsType<"getPublishById">
  >(GET_WATCHING_PUBLISH_QUERY, {
    input: data,
  })

  return result?.getPublishById
}

/**
 * Get all videos
 */
export const FETCH_ALL_VIDEOS_QUERY = gql`
  query FetchAllVideos {
    fetchAllVideos {
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
`
export async function getAllVideos() {
  const result = await client.request<QueryReturnType<"fetchAllVideos">>(
    FETCH_ALL_VIDEOS_QUERY
  )

  return result?.fetchAllVideos
}

/**
 * Get videos by category
 */
export const FETCH_VIDEOS_BY_CAT_QUERY = gql`
  query FetchVideosByCategory($input: FetchPublishesByCatInput!) {
    fetchVideosByCategory(input: $input) {
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
`
export async function getVideosByCategory(category: PublishCategory) {
  const result = await client.request<
    QueryReturnType<"fetchVideosByCategory">,
    QueryArgsType<"fetchVideosByCategory">
  >(FETCH_VIDEOS_BY_CAT_QUERY, { input: { category } })

  return result?.fetchVideosByCategory
}

/**
 * Get watch later videos of a station
 */
export const FETCH_WATCH_LATER_QUERY = gql`
  query GetWatchLater($input: GetWatchLaterInput!) {
    getWatchLater(input: $input) {
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
`
export async function getWatchLater({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: GetWatchLaterInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<QueryReturnType<"getWatchLater">, QueryArgsType<"getWatchLater">>(
      FETCH_WATCH_LATER_QUERY,
      {
        input: data,
      }
    )

  return result?.getWatchLater
}

/**
 * Cache a draft publish
 */
export const CREATE_DRAFT_PUBLISH_MUTATION = gql`
  mutation CreateDraftPublish($input: CreateDraftPublishInput!) {
    createDraftPublish(input: $input) {
      id
    }
  }
`
export async function createDraftPublish({
  idToken,
  signature,
  owner,
  creatorId,
  accountId,
  filename,
}: {
  idToken: string
  signature?: string
  owner: string
  creatorId: string
  accountId: string
  filename: string
}) {
  const data = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      MutationReturnType<"createDraftPublish">,
      MutationArgsType<"createDraftPublish">
    >(CREATE_DRAFT_PUBLISH_MUTATION, {
      input: { owner, creatorId, accountId, filename },
    })

  return data?.createDraftPublish
}

/**
 * Update publish
 */
export const UPDATE_PUBLISH_MUTATION = gql`
  mutation UpdatePublish($input: UpdatePublishInput!) {
    updatePublish(input: $input) {
      id
    }
  }
`
export async function updatePublish({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: UpdatePublishInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      MutationReturnType<"updatePublish">,
      MutationArgsType<"updatePublish">
    >(UPDATE_PUBLISH_MUTATION, {
      input: data,
    })

  return result?.updatePublish
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
