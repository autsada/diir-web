import React, { Suspense } from "react"

import { getAccount } from "@/lib"
import InformModal from "./InformModal"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getAccount()

  return (
    <>
      {children}
      {data && !data.defaultStation && (
        <Suspense>
          <InformModal />
        </Suspense>
      )}
    </>
  )
}
