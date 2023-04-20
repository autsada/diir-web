import { GraphQLClient } from "graphql-request"

import type { QueryReturnType, QueryArgsType } from "./types"
import { GET_ACCOUNT_QUERY } from "./queries"

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
 * @param walletAddress {string} a wallet address for the users sign in with digital wallet
 */
export async function getMyAccount(token: string, walletAddress?: string) {
  const data = await client
    .setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "auth-wallet-account": walletAddress || "",
    })
    .request<QueryReturnType<"getMyAccount">, QueryArgsType<"getMyAccount">>(
      GET_ACCOUNT_QUERY,
      walletAddress ? { input: { accountType: "WALLET" } } : {}
    )

  return data?.getMyAccount
}
