import React, { Suspense } from "react"

import { getAccount } from "@/lib/server"
import InformModal from "./InformModal"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getAccount()
  const account = data?.account
  const idToken = data?.idToken

  if (!account || !idToken) throw new Error("Please sign in to proceed.")

  return (
    <div className="px-4 py-2">
      {children}
      {account && !account.defaultStation && (
        <Suspense>
          <InformModal />
        </Suspense>
      )}
    </div>
  )
}
