import { gql } from "graphql-request"

export const GET_ACCOUNT_QUERY = gql`
  query GetMyAccount {
    getMyAccount {
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
