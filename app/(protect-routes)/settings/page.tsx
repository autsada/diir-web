import React, { Suspense } from "react"

import Address from "./Address"
import Divider from "@/components/Divider"
import ManageStations from "./ManageStations"
import ManageStationsTemplate from "./ManageStationsTemplate"
import { getAccount } from "@/lib"
import { getBalance } from "@/graphql"

export default async function Settings() {
  const account = await getAccount()
  const balance = await getBalance(account?.owner || "")

  return (
    <>
      <h5>Settings</h5>

      <div className="mt-5 py-2">
        <h6>Your wallet</h6>
        <Address address={account?.owner || ""} balance={balance} />
        <div className="px-4 py-2 font-semibold text-base">{balance} ETH</div>
      </div>

      <Divider />

      <Suspense fallback={<ManageStationsTemplate />}>
        <ManageStations
          stations={account?.stations || []}
          owner={account?.owner || ""}
        />
      </Suspense>
    </>
  )
}
