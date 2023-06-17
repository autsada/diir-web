import { gql } from "graphql-request"

import { client } from "./client"
import type {
  FetchMyPublishesInput,
  FetchPublishesInput,
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
  QueryByIdInput,
  UpdatePublishInput,
  FetchPublishesByCatInput,
  LikePublishInput,
  FetchStationPublishesInput,
  FetchShortsInput,
} from "./types"
import { FetchSuggestedPublishesInput } from "./codegen/graphql"

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
      creator {
        isOwner
      }
    }
  }
`
export async function getUploadedPublish({
  idToken,
  signature,
  data: { targetId, requestorId },
}: {
  idToken: string
  signature?: string
  data: QueryByIdInput
}) {
  try {
    const data = await client.request<
      QueryReturnType<"getPublishById">,
      QueryArgsType<"getPublishById">
    >(GET_UPLOADED_PUBLISH_QUERY, { input: { targetId, requestorId } })

    return data?.getPublishById
  } catch (error) {
    throw error
  }
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
  try {
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
  } catch (error) {
    throw error
  }
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

export async function fetchAllVideos({
  requestorId,
  cursor,
}: FetchPublishesInput) {
  try {
    const result = await client.request<
      QueryReturnType<"fetchAllVideos">,
      QueryArgsType<"fetchAllVideos">
    >(FETCH_ALL_VIDEOS_QUERY, {
      input: { cursor, requestorId },
    })

    return result?.fetchAllVideos
  } catch (error) {
    throw error
  }
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
export async function fetchVideosByCategory({
  category,
  cursor,
  requestorId,
}: FetchPublishesByCatInput) {
  try {
    const result = await client.request<
      QueryReturnType<"fetchVideosByCategory">,
      QueryArgsType<"fetchVideosByCategory">
    >(FETCH_VIDEOS_BY_CAT_QUERY, { input: { category, cursor, requestorId } })

    return result?.fetchVideosByCategory
  } catch (error) {
    throw error
  }
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
      thumbnail
      thumbSource
      views
      creator {
        id
        name
        displayName
        image
        followersCount
        isFollowing
        defaultColor
        isOwner
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
      lastComment {
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
      # comments {
      #   id
      #   creator {
      #     id
      #     name
      #     displayName
      #     image
      #   }
      #   content
      #   liked
      #   disLiked
      #   likesCount
      #   commentType
      # }
    }
  }
`
export async function getWatchingPublish(data: QueryByIdInput) {
  try {
    const result = await client.request<
      QueryReturnType<"getPublishById">,
      QueryArgsType<"getPublishById">
    >(GET_WATCHING_PUBLISH_QUERY, {
      input: data,
    })

    return result?.getPublishById
  } catch (error) {
    throw error
  }
}

/**
 * Fetch suggested videos
 */
export const FETCH_SUGGESTED_VIDEOS_QUERY = gql`
  query FetchSuggestedVideos($input: FetchSuggestedPublishesInput!) {
    fetchSuggestedVideos(input: $input) {
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

export async function fetchSuggestedVideos({
  publishId,
  requestorId,
  cursor,
}: FetchSuggestedPublishesInput) {
  try {
    const result = await client.request<
      QueryReturnType<"fetchSuggestedVideos">,
      QueryArgsType<"fetchSuggestedVideos">
    >(FETCH_SUGGESTED_VIDEOS_QUERY, {
      input: { cursor, requestorId, publishId },
    })

    return result?.fetchSuggestedVideos
  } catch (error) {
    throw error
  }
}

/**
 * Fetch publishes of a station
 */
export const FETCH_STATION_PUBLISHES_QUERY = gql`
  query FetchStationPublishes($input: FetchStationPublishesInput!) {
    fetchStationPublishes(input: $input) {
      pageInfo {
        count
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          createdAt
          title
          views
          thumbSource
          thumbnail
          playback {
            id
            duration
            hls
            dash
            preview
          }
        }
      }
    }
  }
`
export async function fetchStationPublishes(data: FetchStationPublishesInput) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
      })
      .request<
        QueryReturnType<"fetchStationPublishes">,
        QueryArgsType<"fetchStationPublishes">
      >(FETCH_STATION_PUBLISHES_QUERY, {
        input: data,
      })

    return result?.fetchStationPublishes
  } catch (error) {
    throw error
  }
}

/**
 * Fetch short videos
 */
export const FETCH_SHORTS_QUERY = gql`
  query FetchShorts($input: FetchShortsInput!) {
    fetchShorts(input: $input) {
      pageInfo {
        count
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
export async function fetchShorts(input: FetchShortsInput) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
      })
      .request<QueryReturnType<"fetchShorts">, QueryArgsType<"fetchShorts">>(
        FETCH_SHORTS_QUERY,
        {
          input,
        }
      )

    return result?.fetchShorts
  } catch (error) {
    throw error
  }
}

/**
 * Get short video by id
 */
export const GET_SHORT_QUERY = gql`
  query GetShort($input: GetShortInput!) {
    getShort(input: $input) {
      item {
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
      followingShorts {
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
  }
`
export async function getShort(input: FetchShortsInput) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
      })
      .request<QueryReturnType<"fetchShorts">, QueryArgsType<"fetchShorts">>(
        GET_SHORT_QUERY,
        {
          input,
        }
      )

    return result?.fetchShorts
  } catch (error) {
    throw error
  }
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
  try {
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
  } catch (error) {
    throw error
  }
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
  try {
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
  } catch (error) {
    throw error
  }
}

/**
 * Like / Undo like publish
 */
export const LIKE_PUBLISH_MUTATION = gql`
  mutation LikePublish($input: LikePublishInput!) {
    likePublish(input: $input) {
      status
    }
  }
`
export async function like({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: LikePublishInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"likePublish">,
        MutationArgsType<"likePublish">
      >(LIKE_PUBLISH_MUTATION, {
        input: data,
      })

    return result?.likePublish
  } catch (error) {
    throw error
  }
}

/**
 * DisLike / Undo disLike publish
 */
export const DISLIKE_PUBLISH_MUTATION = gql`
  mutation DisLikePublish($input: LikePublishInput!) {
    disLikePublish(input: $input) {
      status
    }
  }
`
export async function disLike({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: LikePublishInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"disLikePublish">,
        MutationArgsType<"disLikePublish">
      >(DISLIKE_PUBLISH_MUTATION, {
        input: data,
      })

    return result?.disLikePublish
  } catch (error) {
    throw error
  }
}

/**
 * DisLike / Undo disLike publish
 */
export const COUNT_VIEW_MUTATION = gql`
  mutation CountViews($publishId: String!) {
    countViews(publishId: $publishId) {
      status
    }
  }
`
export async function countViews(publishId: string) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
      })
      .request<
        MutationReturnType<"countViews">,
        MutationArgsType<"countViews">
      >(COUNT_VIEW_MUTATION, {
        publishId,
      })

    return result?.countViews
  } catch (error) {
    throw error
  }
}
