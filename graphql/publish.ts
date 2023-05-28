import { gql } from "graphql-request"

import { client } from "./client"
import type {
  FetchMyPublishesInput,
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
  PublishCategory,
  QueryByIdInput,
  UpdatePublishInput,
} from "./types"

/**
 * Get an uploaded publish for use in the upload action
 */
export const GET_UPLOADED_PUBLISH_QUERY = gql`
  query GetPublishById($input: QueryByIdInput!) {
    getPublishById(input: $input) {
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
    QueryReturnType<"getPublishById">,
    QueryArgsType<"getPublishById">
  >(GET_UPLOADED_PUBLISH_QUERY, { input: { targetId: id } })

  return data?.getPublishById
}

/**
 * Fetch creator publishes
 */
export const FETCH_CREATOR_PUBLISHES_QUERY = gql`
  query FetchMyPublishes($input: FetchMyPublishesInput!) {
    fetchMyPublishes(input: $input) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
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
    }
  }
`
export async function fetchMyPublishes({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: FetchMyPublishesInput
}) {
  const result = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      QueryReturnType<"fetchMyPublishes">,
      QueryArgsType<"fetchMyPublishes">
    >(FETCH_CREATOR_PUBLISHES_QUERY, {
      input: data,
    })

  return result?.fetchMyPublishes
}

/**
 * Fetch all videos
 */
export const FETCH_ALL_VIDEOS_QUERY = gql`
  query FetchAllVideos($input: FetchPublishesInput!) {
    fetchAllVideos(input: $input) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
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
`

export async function fetchAllVideos(
  cursor?: string,
  prefer?: PublishCategory[]
) {
  const result = await client.request<
    QueryReturnType<"fetchAllVideos">,
    QueryArgsType<"fetchAllVideos">
  >(FETCH_ALL_VIDEOS_QUERY, {
    input: { cursor, prefer },
  })

  return result?.fetchAllVideos
}

/**
 * Fetch videos by category
 */
export const FETCH_VIDEOS_BY_CAT_QUERY = gql`
  query FetchVideosByCategory($input: FetchPublishesByCatInput!) {
    fetchVideosByCategory(input: $input) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
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
`
export async function fetchVideosByCategory(
  category: PublishCategory,
  cursor?: string
) {
  const result = await client.request<
    QueryReturnType<"fetchVideosByCategory">,
    QueryArgsType<"fetchVideosByCategory">
  >(FETCH_VIDEOS_BY_CAT_QUERY, { input: { category, cursor } })

  return result?.fetchVideosByCategory
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
