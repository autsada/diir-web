"use client"

import React, { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

import StationItem from "./Item"
import CreateStationModal from "./CreateStationModal"
import ConfirmModal from "@/components/ConfirmModal"
import Mask from "@/components/Mask"
import type { Station } from "@/graphql/types"

interface Props {
  stations: Station[]
  owner: string
  defaultStationId: string
}

export default function ManageStations({
  stations,
  defaultStationId,
  owner,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [switchToId, setSwitchToId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const openModal = useCallback(() => {
    setModalVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const onRequestToSwitch = useCallback((id: string) => {
    setSwitchToId(id)
  }, [])

  const onCancelSwitch = useCallback(() => {
    setSwitchToId("")
  }, [])

  async function confirmSwitchStation() {
    if (!switchToId) return

    try {
      setLoading(true)
      const result = await fetch(`/station/switch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: owner, stationId: switchToId }),
      })

      const data = await result.json()
      if (data?.status === "Ok") {
        // Reload data
        router.refresh()
        if (error) setError("")
        setLoading(false)
        setSwitchToId("")
      }
    } catch (error) {
      setLoading(false)
      setError("Switch station failed")
    }
  }

  return (
    <>
      <div className="mt-5 sm:flex sm:items-start">
        <div className="sm:w-[30%]">
          <h6>Manage stations</h6>
          <button
            className="btn-blue px-6 mx-0 my-5 rounded-full"
            onClick={openModal}
          >
            Create new station
          </button>
        </div>

        <div className="mt-2 sm:w-[70%]">
          {stations.length > 0 ? (
            <>
              <p className="text-textLight">All stations</p>
              <div className="mt-2 divide-y">
                {stations.map((st) => (
                  <StationItem
                    key={st.id}
                    item={st}
                    defaultId={defaultStationId}
                    onRequestToSwitchStation={onRequestToSwitch}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-textLight">You don&apos;t have any stations.</p>
          )}
        </div>
      </div>

      {modalVisible && (
        <CreateStationModal owner={owner} closeModal={closeModal} />
      )}

      {switchToId && (
        <ConfirmModal
          onCancel={onCancelSwitch}
          onConfirm={confirmSwitchStation}
          loading={loading}
          error={error}
        >
          <h6>Switch station?</h6>
        </ConfirmModal>
      )}

      {loading && <Mask />}
    </>
  )
}
