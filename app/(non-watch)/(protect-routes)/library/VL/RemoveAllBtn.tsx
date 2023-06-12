"use client"

import React, { useTransition, useCallback, useState } from "react"

import ConfirmModal from "@/components/ConfirmModal"
import Mask from "@/components/Mask"
import { removeAllWL } from "./actions"
import { deletePL } from "../actions"

interface Props {
  playlistId: string
  playlistName: string
}

export default function RemoveAllBtn({ playlistId, playlistName }: Props) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

  const [isPending, startTransition] = useTransition()

  const startRemove = useCallback(() => {
    setConfirmModalVisible(true)
  }, [])

  const endRemove = useCallback(() => {
    setConfirmModalVisible(false)
  }, [])

  const confirmRemove = useCallback(() => {
    if (playlistId === "VL") {
      startTransition(() => removeAllWL())
    } else {
      startTransition(() => deletePL(playlistId))
    }
    endRemove()
  }, [endRemove, playlistId])

  return (
    <>
      <button
        type="button"
        className="btn-cancel px-5 rounded-full text-sm"
        onClick={startRemove}
      >
        Remove all from {playlistName}
      </button>

      {confirmModalVisible && (
        <ConfirmModal onCancel={endRemove} onConfirm={confirmRemove}>
          <div className="text-base sm:text-lg">
            This will remove{" "}
            <span className="font-semibold">{playlistName}</span> playlist and
            all its content.
          </div>
        </ConfirmModal>
      )}

      {/* Prevent interaction while loading */}
      {isPending && <Mask />}
    </>
  )
}
