import { GraphQLClient } from "graphql-request"

import type {
  QueryReturnType,
  QueryArgsType,
  MutationArgsType,
  MutationReturnType,
  UpdatePublishInput,
  GetMyPublishesInput,
} from "./types"
import {
  GET_ACCOUNT_QUERY,
  GET_BALANCE_QUERY,
  GET_CREATOR_PUBLISH_QUERY,
  GET_MY_PUBLISHES_QUERY,
  GET_STATION_BY_ID_QUERY,
  GET_STATION_BY_NAME_QUERY,
} from "./queries"
import {
  CREATE_ACCOUNT_MUTATION,
  CREATE_STATION_MUTATION,
  MINT_FIRST_STATION_NFT_MUTATION,
  MINT_STATION_NFT_MUTATION,
  VALIDATE_NAME_MUTATION,
  CACHE_SESSION_MUTATION,
  UPDATE_DISPLAY_NAME_MUTATION,
  VALIDATE_DISPLAY_NAME_MUTATION,
  UPDATE_PROFILE_IMAGE_MUTATION,
  UPDATE_BANNER_IMAGE_MUTATION,
  CREATE_DRAFT_PUBLISH_MUTATION,
  UPDATE_PUBLISH_MUTATION,
} from "./mutations"

const { API_URL, NODE_ENV } = process.env

const apiURL = NODE_ENV === "development" ? "http://localhost:4000" : API_URL
const client = new GraphQLClient(`${apiURL}/graphql`, {
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * @dev This function will query a logged-in user's account from the database.
 * @param idToken {string} an id token from the auth system
 * @param signature {string} a signature signed by a wallet
 */
export async function getMyAccount(idToken: string, signature?: string) {
  const data = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<QueryReturnType<"getMyAccount">, QueryArgsType<"getMyAccount">>(
      GET_ACCOUNT_QUERY,
      { input: { accountType: signature ? "WALLET" : "TRADITIONAL" } }
    )
  return data?.getMyAccount
}

/**
 * @param idToken {string} an id token from the auth system
 * @param signature {string} a signature signed by a wallet
 */
export async function createAccount(idToken: string, signature?: string) {
  const data = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      MutationReturnType<"createAccount">,
      MutationArgsType<"createAccount">
    >(CREATE_ACCOUNT_MUTATION, {
      input: { accountType: signature ? "WALLET" : "TRADITIONAL" },
    })

  return data?.createAccount
}

/**
 * Validate station display name
 */
export async function validateStationDisplayName(name: string) {
  const data = await client.request<
    MutationReturnType<"validateDisplayName">,
    MutationArgsType<"validateDisplayName">
  >(VALIDATE_DISPLAY_NAME_MUTATION, { name })

  return data?.validateDisplayName
}

/**
 * Validate station name
 */
export async function validateStationName(name: string) {
  const data = await client.request<
    MutationReturnType<"validateName">,
    MutationArgsType<"validateName">
  >(VALIDATE_NAME_MUTATION, { name })

  return data?.validateName
}

/**
 * Mint Station NFT by admin
 */
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
}

/**
 * Mint Station NFT
 */
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
}

/**
 * Create station in the database
 */
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
}

/**
 * @dev This function will query a station by its id
 */
export async function getStationById(targetId: string, requestorId?: string) {
  const data = await client.request<
    QueryReturnType<"getStationById">,
    QueryArgsType<"getStationById">
  >(GET_STATION_BY_ID_QUERY, {
    input: { targetId, requestorId: requestorId || null },
  })

  return data?.getStationById
}

/**
 * @dev This function will query a station by its name
 */
export async function getStationByName(name: string, requestorId?: string) {
  const data = await client.request<
    QueryReturnType<"getStationByName">,
    QueryArgsType<"getStationByName">
  >(GET_STATION_BY_NAME_QUERY, {
    input: { name, requestorId: requestorId || null },
  })

  return data?.getStationByName
}

/**
 * Update station name in the database
 */
export async function updateStationName({
  idToken,
  owner,
  accountId,
  name,
  stationId,
  signature,
}: {
  idToken: string
  owner: string
  accountId: string
  name: string
  stationId: string // Station id to be updated
  signature?: string
}) {
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
      input: { owner, accountId, name, stationId },
    })

  return data?.updateDisplayName
}

/**
 * Update station profile image in the database
 */
export async function updateStationImage({
  idToken,
  owner,
  accountId,
  image,
  imageRef,
  stationId,
  signature,
}: {
  idToken: string
  owner: string
  accountId: string
  image: string
  imageRef: string
  stationId: string // Station id to be updated
  signature?: string
}) {
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
      input: { owner, accountId, image, imageRef, stationId },
    })

  return data?.updateProfileImage
}

/**
 * Update station banner image in the database
 */
export async function updateStationBannerImage({
  idToken,
  owner,
  accountId,
  image,
  imageRef,
  stationId,
  signature,
}: {
  idToken: string
  owner: string
  accountId: string
  image: string
  imageRef: string
  stationId: string // Station id to be updated
  signature?: string
}) {
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
      input: { owner, accountId, image, imageRef, stationId },
    })

  return data?.updateBannerImage
}

/**
 * @dev This function will query a balance by address
 */
export async function getBalance(address: string) {
  const data = await client.request<
    QueryReturnType<"getBalance">,
    QueryArgsType<"getBalance">
  >(GET_BALANCE_QUERY, {
    address,
  })

  return data?.getBalance
}

/**
 * Cache user session
 */
export async function cacheLoggedInSession({
  idToken,
  signature,
  address,
  stationId,
  accountId,
}: {
  idToken: string
  signature?: string
  address: string
  stationId: string
  accountId: string
}) {
  const data = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "auth-wallet-signature": signature || "",
    })
    .request<
      MutationReturnType<"cacheSession">,
      MutationArgsType<"cacheSession">
    >(CACHE_SESSION_MUTATION, { input: { address, stationId, accountId } })

  return data?.cacheSession
}

/**
 * Cache a draft publish
 */
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
 * Get an uploaded publish for use in the upload action
 */
export async function getUploadedPublish(id: string) {
  const data = await client.request<
    QueryReturnType<"getPublishForCreator">,
    QueryArgsType<"getPublishForCreator">
  >(GET_CREATOR_PUBLISH_QUERY, { id })

  return data?.getPublishForCreator
}

/**
 * Update publish
 */
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
 * Get creator publishes
 */
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
