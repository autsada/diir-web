"use client"

import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

import CreateStationModal from "../settings/CreateStationModal"
import type { Account } from "@/graphql/codegen/graphql"

interface Props {
  account: Account | null
}

export default function Station({ account }: Props) {
  const [modalVisible, setModalVisible] = useState(
    () => !account?.defaultStation
  )

  const router = useRouter()

  const closeModal = useCallback(() => {
    setModalVisible(false)
    router.back()
  }, [router])

  return (
    <>
      <h5>Create station</h5>
      <p className="text-textExtraLight">
        To start upload and add publishes to playlist, you need a station.
        Please create one.
      </p>

      {modalVisible && (
        <CreateStationModal account={account!} closeModal={closeModal} />
      )}
    </>
  )
}
