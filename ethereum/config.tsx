import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { configureChains, createClient } from "wagmi"
import { mainnet, goerli, localhost } from "@wagmi/chains"

import { WALLET_CONNECT_PROJECT_ID } from "@/lib/constants"

const chains = [mainnet, goerli, localhost]
const projectId = WALLET_CONNECT_PROJECT_ID

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
})
export const ethereumClient = new EthereumClient(wagmiClient, chains)
