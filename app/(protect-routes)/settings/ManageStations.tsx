"use client"

import React, { useState, useCallback } from "react"

import StationItem from "./Item"
import type { Station } from "@/graphql/types"
import CreateStationModal from "./CreateStationModal"

interface Props {
  stations: Station[]
  owner: string
}

export default function ManageStations({ stations, owner }: Props) {
  const [modalVisible, setModalVisible] = useState(false)

  const openModal = useCallback(() => {
    setModalVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

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
                  <StationItem key={st.id} item={st} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-textLight">You don&apos;t have any stations</p>
          )}
        </div>
      </div>

      {modalVisible && (
        <CreateStationModal owner={owner} closeModal={closeModal} />
      )}
    </>
  )
}
