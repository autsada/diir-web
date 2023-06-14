import React from "react"
import { redirect } from "next/navigation"

import SectionHeader from "../SectionHeader"
import Topics from "./Topics"
import { getAccount } from "@/lib/server"

export default async function Preferences() {
  const data = await getAccount()
  const account = data?.account
  const loggedInStation = account?.defaultStation
  if (!loggedInStation) {
    redirect("/settings/stations")
  }

  return (
    <>
      <SectionHeader sectionName="Preferences" />

      <div className="mt-4">
        <p>
          Decide what you want to see on VewWit based on your preferences. You
          can choose upto 10 topics.
        </p>
        <div className="mt-5 px-0 pb-10 sm:px-10 sm:pb-0">
          <Topics preferences={loggedInStation.preferences} />
        </div>
      </div>
    </>
  )
}
