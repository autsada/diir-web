import { gql } from "graphql-request"

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: GetMyAccountInput) {
    createAccount(input: $input) {
      id
      owner
      authUid
      type
    }
  }
`
