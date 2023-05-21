import { gql } from "graphql-request"

export const GET_ACCOUNT_QUERY = gql`
  query GetMyAccount($input: GetMyAccountInput!) {
    getMyAccount(input: $input) {
      id
      owner
      type
      createdAt
      stations {
        id
        name
        displayName
        owner
        image
        imageRef
        bannerImage
        bannerImageRef
        defaultColor
        followersCount
        followingCount
        publishesCount
      }
      defaultStation {
        id
        name
        displayName
        owner
        image
        imageRef
        bannerImage
        bannerImageRef
        defaultColor
        followersCount
        followingCount
        publishesCount
      }
    }
  }
`

export const GET_STATION_BY_ID_QUERY = gql`
  query GetStationById($input: QueryByIdInput!) {
    getStationById(input: $input) {
      id
      name
      displayName
      image
      imageRef
      bannerImage
      bannerImageRef
      defaultColor
      accountId
      owner
      createdAt
      followersCount
      followingCount
      publishesCount
      isFollowing
      isOwner
      publishes {
        id
        thumbnail
        title
        createdAt
        views
        playback {
          id
          preview
          duration
          dash
          hls
        }
      }
    }
  }
`

export const GET_STATION_BY_NAME_QUERY = gql`
  query GetStationByName($input: QueryByNameInput!) {
    getStationByName(input: $input) {
      id
      name
      displayName
      image
      imageRef
      bannerImage
      bannerImageRef
      defaultColor
      accountId
      owner
      createdAt
      followersCount
      followingCount
      publishesCount
      isFollowing
      isOwner
      publishes {
        id
        thumbnail
        title
        createdAt
        views
        playback {
          id
          preview
          duration
          dash
          hls
        }
      }
    }
  }
`

export const GET_BALANCE_QUERY = gql`
  query Query($address: String!) {
    getBalance(address: $address)
  }
`

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
      playback {
        id
        thumbnail
        duration
      }
    }
  }
`

export const GET_WATCHING_PUBLISH_QUERY = gql`
  query GetPublishById($input: QueryByIdInput!) {
    getPublishById(input: $input) {
      id
      title
      description
      createdAt
      primaryCategory
      secondaryCategory
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
      creator {
        id
        name
        displayName
        image
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
      creator {
        id
        name
        displayName
        image
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
