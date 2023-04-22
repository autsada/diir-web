import { GraphQLClient } from "graphql-request"

import type {
  QueryReturnType,
  QueryArgsType,
  MutationArgsType,
  MutationReturnType,
} from "./types"
import { GET_ACCOUNT_QUERY } from "./queries"
import { CREATE_ACCOUNT_MUTATION } from "./mutations"

const { API_URL_DEV, API_URL_TEST, NODE_ENV } = process.env

const apiURL = NODE_ENV === "development" ? API_URL_DEV : API_URL_TEST
const client = new GraphQLClient(`${apiURL}/graphql`, {
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * @dev This function will query a logged-in user's account from the database.
 * @param token {string} an id token from the auth system
 * @param message {string} a (signed message + wallet address) that used to authenticate users that sign in with digital wallet
 */
export async function getMyAccount(token: string, message?: string) {
  const data = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "auth-wallet-account": message || "",
    })
    .request<QueryReturnType<"getMyAccount">, QueryArgsType<"getMyAccount">>(
      GET_ACCOUNT_QUERY,
      message ? { input: { accountType: "WALLET" } } : {}
    )

  return data?.getMyAccount
}

/**
 * @param token {string} an id token from the auth system
 * @param message {string} a (signed message + wallet address) that used to authenticate users that sign in with digital wallet
 */
export async function createAccount(token: string, message?: string) {
  const data = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "auth-wallet-account": message || "",
    })
    .request<
      MutationReturnType<"createAccount">,
      MutationArgsType<"createAccount">
    >(
      CREATE_ACCOUNT_MUTATION,
      message ? { input: { accountType: "WALLET" } } : {}
    )

  return data?.createAccount
}
