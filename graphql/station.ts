import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
  FollowInput,
  UpdateDisplayNameInput,
  UpdateImageInput,
  UpdatePreferencesInput,
} from "./types"

/**
 * @dev This function will query a station by its id
 */
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
export async function getStationById(targetId: string, requestorId?: string) {
  try {
    const data = await client.request<
      QueryReturnType<"getStationById">,
      QueryArgsType<"getStationById">
    >(GET_STATION_BY_ID_QUERY, {
      input: { targetId, requestorId: requestorId || null },
    })

    return data?.getStationById
  } catch (error) {
    throw error
  }
}

/**
 * @dev This function will query a station by its name
 */
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
      # publishes {
      #   id
      #   thumbnail
      #   title
      #   createdAt
      #   views
      #   playback {
      #     id
      #     preview
      #     duration
      #     dash
      #     hls
      #   }
      # }
    }
  }
`
export async function getStationByName(name: string, requestorId?: string) {
  try {
    const data = await client.request<
      QueryReturnType<"getStationByName">,
      QueryArgsType<"getStationByName">
    >(GET_STATION_BY_NAME_QUERY, {
      input: { name, requestorId: requestorId || null },
    })

    return data?.getStationByName
  } catch (error) {
    throw error
  }
}

/**
 * Validate station display name
 */
export const VALIDATE_DISPLAY_NAME_MUTATION = gql`
  mutation ValidateDisplayName($name: String!) {
    validateDisplayName(name: $name)
  }
`
export async function validateStationDisplayName(name: string) {
  try {
    const data = await client.request<
      MutationReturnType<"validateDisplayName">,
      MutationArgsType<"validateDisplayName">
    >(VALIDATE_DISPLAY_NAME_MUTATION, { name })

    return data?.validateDisplayName
  } catch (error) {
    throw error
  }
}

/**
 * Validate station name
 */
export const VALIDATE_NAME_MUTATION = gql`
  mutation ValidateName($name: String!) {
    validateName(name: $name)
  }
`
export async function validateStationName(name: string) {
  try {
    const data = await client.request<
      MutationReturnType<"validateName">,
      MutationArgsType<"validateName">
    >(VALIDATE_NAME_MUTATION, { name })

    return data?.validateName
  } catch (error) {
    throw error
  }
}

/**
 * Mint Station NFT by admin
 */
export const MINT_FIRST_STATION_NFT_MUTATION = gql`
  mutation MintFirstStationNFT($input: MintStationNFTInput!) {
    mintFirstStationNFT(input: $input) {
      tokenId
    }
  }
`
export async function mintFirstStationNFT({
  idToken,
  signature,
  to,
  name,
  accountId,
}: {
  idToken: string
  signature?: string
  to: string
  name: string
  accountId: string
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"mintFirstStationNFT">,
        MutationArgsType<"mintFirstStationNFT">
      >(MINT_FIRST_STATION_NFT_MUTATION, { input: { to, name, accountId } })

    return data?.mintFirstStationNFT
  } catch (error) {
    throw error
  }
}

/**
 * Mint Station NFT
 */
export const MINT_STATION_NFT_MUTATION = gql`
  mutation MintStationNFT($input: MintStationNFTInput!) {
    mintStationNFT(input: $input) {
      tokenId
    }
  }
`
export async function mintStationNFT({
  idToken,
  signature,
  to,
  name,
  accountId,
}: {
  idToken: string
  signature?: string
  to: string
  name: string
  accountId: string
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"mintStationNFT">,
        MutationArgsType<"mintStationNFT">
      >(MINT_STATION_NFT_MUTATION, { input: { to, name, accountId } })

    return data?.mintStationNFT
  } catch (error) {
    throw error
  }
}

/**
 * Create station in the database
 */
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
export async function createStation({
  idToken,
  owner,
  accountId,
  name,
  tokenId,
  signature,
}: {
  idToken: string
  owner: string
  accountId: string
  name: string
  tokenId: number // Station NFT token id
  signature?: string
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"createStation">,
        MutationArgsType<"createStation">
      >(CREATE_STATION_MUTATION, { input: { owner, accountId, name, tokenId } })

    return data?.createStation
  } catch (error) {
    throw error
  }
}

/**
 * Update station name in the database
 */
export const UPDATE_DISPLAY_NAME_MUTATION = gql`
  mutation UpdateDisplayName($input: UpdateDisplayNameInput!) {
    updateDisplayName(input: $input) {
      status
    }
  }
`
export async function updateStationName({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: UpdateDisplayNameInput
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"updateDisplayName">,
        MutationArgsType<"updateDisplayName">
      >(UPDATE_DISPLAY_NAME_MUTATION, {
        input,
      })

    return data?.updateDisplayName
  } catch (error) {
    throw error
  }
}

/**
 * Update station profile image in the database
 */
export const UPDATE_PROFILE_IMAGE_MUTATION = gql`
  mutation UpdateProfileImage($input: UpdateImageInput!) {
    updateProfileImage(input: $input) {
      status
    }
  }
`
export async function updateStationImage({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: UpdateImageInput
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"updateProfileImage">,
        MutationArgsType<"updateProfileImage">
      >(UPDATE_PROFILE_IMAGE_MUTATION, {
        input,
      })

    return data?.updateProfileImage
  } catch (error) {
    throw error
  }
}

/**
 * Update station banner image in the database
 */
export const UPDATE_BANNER_IMAGE_MUTATION = gql`
  mutation UpdateBannerImage($input: UpdateImageInput!) {
    updateBannerImage(input: $input) {
      status
    }
  }
`
export async function updateStationBannerImage({
  idToken,
  signature,
  input,
}: {
  idToken: string
  signature?: string
  input: UpdateImageInput
}) {
  try {
    const data = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"updateBannerImage">,
        MutationArgsType<"updateBannerImage">
      >(UPDATE_BANNER_IMAGE_MUTATION, {
        input,
      })

    return data?.updateBannerImage
  } catch (error) {
    throw error
  }
}

/**
 * Follow/unFollow station
 */
export const FOLLOW_MUTATION = gql`
  mutation Follow($input: FollowInput!) {
    follow(input: $input) {
      status
    }
  }
`
export async function follow({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: FollowInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<MutationReturnType<"follow">, MutationArgsType<"follow">>(
        FOLLOW_MUTATION,
        {
          input: data,
        }
      )

    return result?.follow
  } catch (error) {
    throw error
  }
}

/**
 * Update user's watch preferences
 */
export const UPDATE_WATCH_PREFERENCES_MUTATION = gql`
  mutation UpdateWatchPreferences($input: UpdatePreferencesInput!) {
    updateWatchPreferences(input: $input) {
      status
    }
  }
`
export async function updateWatchPreferences({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: UpdatePreferencesInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"updateWatchPreferences">,
        MutationArgsType<"updateWatchPreferences">
      >(UPDATE_WATCH_PREFERENCES_MUTATION, {
        input: data,
      })

    return result?.updateWatchPreferences
  } catch (error) {
    throw error
  }
}

/**
 * Update user's read preferences
 */
export const UPDATE_READ_PREFERENCES_MUTATION = gql`
  mutation UpdateReadPreferences($input: UpdatePreferencesInput!) {
    updateReadPreferences(input: $input) {
      status
    }
  }
`
export async function updateReadPreferences({
  idToken,
  signature,
  data,
}: {
  idToken: string
  signature?: string
  data: UpdatePreferencesInput
}) {
  try {
    const result = await client
      .setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
        "auth-wallet-signature": signature || "",
      })
      .request<
        MutationReturnType<"updateReadPreferences">,
        MutationArgsType<"updateReadPreferences">
      >(UPDATE_READ_PREFERENCES_MUTATION, {
        input: data,
      })

    return result?.updateReadPreferences
  } catch (error) {
    throw error
  }
}
