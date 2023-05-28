import router from "next/router"
import React from "react"

import ModalWrapper from "@/components/ModalWrapper"

interface Props {
  closeModal: () => void
}

export default function InformModal({ closeModal }: Props) {
  return (
    <ModalWrapper visible>
      <div className="w-[90%] sm:w-[60%] lg:w-[40%] p-10 bg-white rounded-xl text-center">
        <h6>You need a station to add publishes to playlist.</h6>

        <button
          type="button"
          className="btn-dark mt-6 px-6 rounded-full"
          onClick={() => router.push("/station")}
        >
          Create a station
        </button>

        <button
          type="button"
          className="mt-6 text-orange-500"
          onClick={closeModal}
        >
          Maybe later
        </button>
      </div>
    </ModalWrapper>
  )
}
