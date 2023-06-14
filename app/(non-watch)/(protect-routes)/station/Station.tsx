"use client"

import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

import CreateStationModal from "../settings/stations/CreateStationModal"
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
      <h6 className="text-lg">No station found.</h6>
      <p className="text-textLight">
        To start upload, follow, comment, and more on VewWit you need a station.
      </p>

      {modalVisible && (
        <CreateStationModal account={account!} closeModal={closeModal} />
      )}
    </>
  )
}
