import React, { Suspense } from "react"

import SectionHeader from "../SectionHeader"
import ManageStations from "./ManageStations"
import ManageStationsTemplate from "./ManageStationsTemplate"
import { getAccount } from "@/lib/server"

export default async function Profiles() {
  const data = await getAccount()
  const account = data?.account

  return (
    <>
      <SectionHeader sectionName="Profiles" />

      <div className="mt-4">
        <Suspense fallback={<ManageStationsTemplate />}>
          <ManageStations
            account={account!}
            defaultStationId={account?.defaultStation?.id || ""}
            owner={account?.owner || ""}
          />
        </Suspense>
      </div>
    </>
  )
}
