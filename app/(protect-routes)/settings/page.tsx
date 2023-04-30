import React from "react"

import { getAccount } from "@/lib"

export default async function Settings() {
  const data = await getAccount()

  console.log("data: ", data)
  return (
    <>
      <h5>Settings</h5>
    </>
  )
}
