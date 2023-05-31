import { gql } from "graphql-request"

import { client } from "./client"
import type {
  QueryReturnType,
  QueryArgsType,
  MutationReturnType,
  MutationArgsType,
} from "./types"

/**
 * @dev This function will query a logged-in user's account from the database.
 * @param idToken {string} an id token from the auth system
 * @param signature {string} a signature signed by a wallet
 */
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
export async function getMyAccount(idToken: string, signature?: string) {
  try {
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
  } catch (error) {
    throw error
  }
}

/**
 * @dev This function will query a balance by address
 */
export const GET_BALANCE_QUERY = gql`
  query Query($address: String!) {
    getBalance(address: $address)
  }
`
export async function getBalance(address: string) {
  try {
    const data = await client.request<
      QueryReturnType<"getBalance">,
      QueryArgsType<"getBalance">
    >(GET_BALANCE_QUERY, {
      address,
    })

    return data?.getBalance
  } catch (error) {
    throw error
  }
}

/**
 * @param idToken {string} an id token from the auth system
 * @param signature {string} a signature signed by a wallet
 */
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
export async function createAccount(idToken: string, signature?: string) {
  try {
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
  } catch (error) {
    throw error
  }
}

/**
 * Cache user session
 */
export const CACHE_SESSION_MUTATION = gql`
  mutation CacheSession($input: CacheSessionInput!) {
    cacheSession(input: $input) {
      status
    }
  }
`
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
  try {
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
  } catch (error) {
    throw error
  }
}
