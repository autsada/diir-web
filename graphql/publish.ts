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
  UpdateVideoInput,
  FetchPublishesByCatInput,
  LikePublishInput,
  FetchStationPublishesInput,
  FetchShortsInput,
  GetShortInput,
  CreateDraftVideoInput,
  CreateDraftBlogInput,
  UpdateBlogInput,
  DeletePublishInput,
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
      deleting
      uploadError
      transcodeError
      kind
      tags
      creator {
        isOwner
      }
      playback {
        id
        videoId
        thumbnail
        preview
        duration
        dash
        hls
      }
      blog {
        createdAt
        updatedAt
        content
        publishId
        readingTime
        excerpt
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
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
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
          deleting
          uploadError
          tipsCount
          visibility
          kind
          tags
          playback {
            id
            thumbnail
            duration
          }
          blog {
            createdAt
            updatedAt
            content
            publishId
            readingTime
            excerpt
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
          tags
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
export async function fetchAllVideos(input: FetchPublishesInput) {
  try {
    const result = await client.request<
      QueryReturnType<"fetchAllVideos">,
      QueryArgsType<"fetchAllVideos">
    >(FETCH_ALL_VIDEOS_QUERY, {
      input,
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
          tags
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
      tags
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
      bookmarked
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
      blog {
        createdAt
        updatedAt
        content
        htmlContent
        publishId
        readingTime
        excerpt
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
          tags
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
          description
          createdAt
          views
          visibility
          thumbSource
          thumbnail
          primaryCategory
          secondaryCategory
          kind
          liked
          disLiked
          likesCount
          commentsCount
          tags
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
      id
      title
      description
      createdAt
      kind
    }
  }
`
export async function getShort(input: GetShortInput) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
      })
      .request<QueryReturnType<"getShort">, QueryArgsType<"getShort">>(
        GET_SHORT_QUERY,
        {
          input,
        }
      )

    return result?.getShort
  } catch (error) {
    throw error
  }
}

/**
 * Fetch blogs
 */
export const FETCH_BLOGS_QUERY = gql`
  query FetchBlogs($input: FetchPublishesInput!) {
    fetchBlogs(input: $input) {
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
          tags
          liked
          likesCount
          commentsCount
          bookmarked
          creator {
            id
            name
            displayName
            image
            defaultColor
            isOwner
          }
          blog {
            createdAt
            updatedAt
            content
            publishId
            readingTime
            excerpt
          }
        }
      }
    }
  }
`
export async function fetchBlogs(input: FetchPublishesInput) {
  try {
    const result = await client.request<
      QueryReturnType<"fetchBlogs">,
      QueryArgsType<"fetchBlogs">
    >(FETCH_BLOGS_QUERY, {
      input,
    })

    return result?.fetchBlogs
  } catch (error) {
    throw error
  }
}

/**
 * Create draft video
 */
export const CREATE_DRAFT_VIDEO_MUTATION = gql`
  mutation CreateDraftVideo($input: CreateDraftVideoInput!) {
    createDraftVideo(input: $input) {
      id
    }
  }
`
export async function createDraftVideo({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: CreateDraftVideoInput
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"createDraftVideo">,
        MutationArgsType<"createDraftVideo">
      >(CREATE_DRAFT_VIDEO_MUTATION, {
        input,
      })

    return data?.createDraftVideo
  } catch (error) {
    throw error
  }
}

/**
 * Create draft blog
 */
export const CREATE_DRAFT_BLOG_MUTATION = gql`
  mutation CreateDraftBlog($input: CreateDraftBlogInput!) {
    createDraftBlog(input: $input) {
      id
    }
  }
`
export async function createDraftBlog({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: CreateDraftBlogInput
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"createDraftBlog">,
        MutationArgsType<"createDraftBlog">
      >(CREATE_DRAFT_BLOG_MUTATION, {
        input,
      })

    return data?.createDraftBlog
  } catch (error) {
    throw error
  }
}

/**
 * Update video
 */
export const UPDATE_VIDEO_MUTATION = gql`
  mutation UpdateVideo($input: UpdateVideoInput!) {
    updateVideo(input: $input) {
      id
    }
  }
`
export async function updateVideo({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: UpdateVideoInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"updateVideo">,
        MutationArgsType<"updateVideo">
      >(UPDATE_VIDEO_MUTATION, {
        input,
      })

    return result?.updateVideo
  } catch (error) {
    throw error
  }
}

/**
 * Update blog
 */
export const UPDATE_BLOG_MUTATION = gql`
  mutation UpdateBlog($input: UpdateBlogInput!) {
    updateBlog(input: $input) {
      status
    }
  }
`
export async function updateBlog({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: UpdateBlogInput
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"updateBlog">,
        MutationArgsType<"updateBlog">
      >(UPDATE_BLOG_MUTATION, {
        input,
      })

    return data?.updateBlog
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

/**
 * Delete publish
 */
export const DELETE_PUBLISH_MUTATION = gql`
  mutation DeletePublish($input: DeletePublishInput!) {
    deletePublish(input: $input) {
      status
    }
  }
`
export async function deletePublish({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: DeletePublishInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"deletePublish">,
        MutationArgsType<"deletePublish">
      >(DELETE_PUBLISH_MUTATION, {
        input,
      })

    return result?.deletePublish
  } catch (error) {
    throw error
  }
}
