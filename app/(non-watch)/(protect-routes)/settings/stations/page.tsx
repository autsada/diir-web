import React, { Suspense } from "react"

import SectionHeader from "../SectionHeader"
import Address from "./Address"
import Divider from "@/components/Divider"
import ManageStations from "./ManageStations"
import ManageStationsTemplate from "./ManageStationsTemplate"
import { getAccount } from "@/lib/server"
import { getBalance } from "@/graphql"

export default async function Stations() {
  const data = await getAccount()
  const account = data?.account
  const balance = await getBalance(account?.owner || "")

  return (
    <>
      <SectionHeader sectionName="Stations" />

      <div className="mt-5 py-2">
        <h6 className="text-base sm:text-lg lg:text-xl">Your wallet</h6>
        <div className="sm:flex">
          <div className="sm:w-[70%] md:w-[60%]">
            <Address address={account?.owner || ""} balance={balance || ""} />
            <div className="px-4 py-2 font-semibold text-sm sm:text-base">
              {Number(balance).toFixed(4)} ETH
            </div>
          </div>
          <div className="my-5 sm:my-0 sm:w-[30%] md:w-[40%] text-center">
            <button className="btn-dark px-8 rounded-full">
              Transfer money
            </button>
          </div>
        </div>
      </div>

      <Divider />

      <Suspense fallback={<ManageStationsTemplate />}>
        <ManageStations
          account={account!}
          defaultStationId={account?.defaultStation?.id || ""}
          owner={account?.owner || ""}
        />
      </Suspense>
    </>
  )
}
