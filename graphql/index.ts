import { GraphQLClient } from "graphql-request"

import type {
  QueryReturnType,
  QueryArgsType,
  MutationArgsType,
  MutationReturnType,
} from "./types"
import {
  GET_ACCOUNT_QUERY,
  GET_BALANCE_QUERY,
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
} from "./mutations"

const { API_URL_DEV, API_URL_TEST, NODE_ENV } = process.env

const apiURL = NODE_ENV === "development" ? API_URL_DEV : API_URL_TEST
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
  address,
  stationId,
}: {
  idToken: string
  address: string
  stationId: string
}) {
  const data = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    })
    .request<
      MutationReturnType<"cacheSession">,
      MutationArgsType<"cacheSession">
    >(CACHE_SESSION_MUTATION, { input: { address, stationId } })

  return data?.cacheSession
}
