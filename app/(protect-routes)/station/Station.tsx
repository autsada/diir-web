"use client"

import React, { useCallback, useState } from "react"

import CreateStationModal from "./CreateStationModal"
import type { Account } from "@/graphql/types"

interface Props {
  account: Account | null
}

export default function Station({ account }: Props) {
  const [modalVisible, setModalVisible] = useState(
    () => !account?.defaultStation
  )

  const openModal = useCallback(() => {
    setModalVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  return (
    <div>
      <h6>Station</h6>

      {modalVisible && (
        <CreateStationModal
          owner={account?.owner || ""}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}
