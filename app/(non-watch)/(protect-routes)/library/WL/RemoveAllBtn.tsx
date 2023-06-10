"use client"

import React, { useTransition, useCallback, useState } from "react"

import ConfirmModal from "@/components/ConfirmModal"
import Mask from "@/components/Mask"
import { removeAllWL } from "./actions"

export default function RemoveAllBtn() {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

  const [isPending, startTransition] = useTransition()

  const startRemove = useCallback(() => {
    setConfirmModalVisible(true)
  }, [])

  const endRemove = useCallback(() => {
    setConfirmModalVisible(false)
  }, [])

  const confirmRemove = useCallback(() => {
    startTransition(() => removeAllWL())
    endRemove()
  }, [endRemove])

  return (
    <>
      <button
        type="button"
        className="btn-cancel px-5 rounded-full text-sm"
        onClick={startRemove}
      >
        Remove all from watch later
      </button>

      {confirmModalVisible && (
        <ConfirmModal onCancel={endRemove} onConfirm={confirmRemove}>
          <p className="text-xl">
            This will remove all publishes in your watch later.
          </p>
        </ConfirmModal>
      )}

      {/* Prevent interaction while loading */}
      {isPending && <Mask />}
    </>
  )
}
