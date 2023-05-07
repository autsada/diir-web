import React, { Suspense } from "react"

import { getAccount } from "@/lib"
import InformModal from "./InformModal"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const account = await getAccount()

  return (
    <>
      {children}
      {account && !account.defaultStation && (
        <Suspense>
          <InformModal />
        </Suspense>
      )}
    </>
  )
}
