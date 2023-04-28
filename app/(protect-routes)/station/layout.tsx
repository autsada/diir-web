import React from "react"
import { redirect } from "next/navigation"

import { getAccount } from "@/lib"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getAccount()
  if (!data) {
    redirect("/")
  }

  return <>{children}</>
}
