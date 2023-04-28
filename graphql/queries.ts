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
