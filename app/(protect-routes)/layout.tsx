import React from "react"
import { redirect } from "next/navigation"

import { getAccount } from "@/lib"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const account = await getAccount()

  if (!account) {
    redirect("/")
  }

  return <div className="w-full px-4 py-2 sm:px-12">{children}</div>
}
