import { gql } from "graphql-request"

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: GetMyAccountInput!) {
    createAccount(input: $input) {
      id
      owner
      authUid
      type
    }
  }
`

export const VALIDATE_DISPLAY_NAME_MUTATION = gql`
  mutation ValidateDisplayName($name: String!) {
    validateDisplayName(name: $name)
  }
`

export const VALIDATE_NAME_MUTATION = gql`
  mutation ValidateName($name: String!) {
    validateName(name: $name)
  }
`

export const MINT_FIRST_STATION_NFT_MUTATION = gql`
  mutation MintFirstStationNFT($input: MintStationNFTInput!) {
    mintFirstStationNFT(input: $input) {
      tokenId
    }
  }
`

export const MINT_STATION_NFT_MUTATION = gql`
  mutation MintStationNFT($input: MintStationNFTInput!) {
    mintStationNFT(input: $input) {
      tokenId
    }
  }
`

export const CREATE_STATION_MUTATION = gql`
  mutation CreateStation($input: CreateStationInput!) {
    createStation(input: $input) {
      id
      name
      displayName
      owner
      accountId
      tokenId
    }
  }
`

export const UPDATE_DISPLAY_NAME_MUTATION = gql`
  mutation UpdateDisplayName($input: UpdateDisplayNameInput!) {
    updateDisplayName(input: $input) {
      status
    }
  }
`

export const UPDATE_PROFILE_IMAGE_MUTATION = gql`
  mutation UpdateProfileImage($input: UpdateImageInput!) {
    updateProfileImage(input: $input) {
      status
    }
  }
`

export const UPDATE_BANNER_IMAGE_MUTATION = gql`
  mutation UpdateBannerImage($input: UpdateImageInput!) {
    updateBannerImage(input: $input) {
      status
    }
  }
`

export const CACHE_SESSION_MUTATION = gql`
  mutation CacheSession($input: CacheSessionInput!) {
    cacheSession(input: $input) {
      status
    }
  }
`

export const CREATE_DRAFT_PUBLISH_MUTATION = gql`
  mutation CreateDraftPublish($input: CreateDraftPublishInput!) {
    createDraftPublish(input: $input) {
      id
    }
  }
`

export const UPDATE_PUBLISH_MUTATION = gql`
  mutation UpdatePublish($input: UpdatePublishInput!) {
    updatePublish(input: $input) {
      id
    }
  }
`

export const ADD_TO_WATCH_LATER_MUTATION = gql`
  mutation AddToWatchLater($input: SavePublishToPlayListInput!) {
    addToWatchLater(input: $input) {
      status
    }
  }
`
