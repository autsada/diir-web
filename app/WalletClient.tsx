"use client"

import React from "react"
import { WagmiConfig } from "wagmi"
import { Web3Modal } from "@web3modal/react"

import { wagmiClient, ethereumClient } from "@/ethereum/config"
import { WALLET_CONNECT_PROJECT_ID } from "@/lib/constants"

export default function WalletClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>

      <Web3Modal
        projectId={WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </>
  )
}
