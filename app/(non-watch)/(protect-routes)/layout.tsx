import React from "react"
import { redirect } from "next/navigation"

import { getAccount } from "@/lib/server"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getAccount()
  const account = data?.account

  if (!data || !account) {
    redirect("/")
  }

  return <div className="w-full py-2">{children}</div>
}
