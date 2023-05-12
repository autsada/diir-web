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

  return (
    <div className="py-2">
      {children}
      {account && !account.defaultStation && (
        <Suspense>
          <InformModal />
        </Suspense>
      )}
    </div>
  )
}
