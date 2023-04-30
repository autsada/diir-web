"use client"

import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

import CreateStationModal from "./CreateStationModal"
import type { Account } from "@/graphql/types"

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
        To start upload content, you need a station.
      </p>

      {modalVisible && (
        <CreateStationModal
          owner={account?.owner || ""}
          closeModal={closeModal}
        />
      )}
    </>
  )
}
