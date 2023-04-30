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
