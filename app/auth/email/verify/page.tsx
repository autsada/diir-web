import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import VerifyEmail from "./Verify"
import { getAccount } from "@/lib"

export default async function Verify() {
  const data = await getAccount()

  // If user already logged in, redirect to homepage
  if (data) {
    redirect("/")
  }

  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  )
}
