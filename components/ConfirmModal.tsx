import React from "react"

import ModalWrapper from "./ModalWrapper"
import ButtonLoader from "./ButtonLoader"

interface Props {
  children: React.ReactNode
  onCancel: () => void
  onConfirm: () => void
  loading?: boolean
  error?: string
  disabled?: boolean
}

export default function ConfirmModal({
  children,
  onCancel,
  onConfirm,
  loading,
  error,
  disabled,
}: Props) {
  return (
    <ModalWrapper visible>
      <div className="relative z-50 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] mx-auto p-10 bg-white rounded-xl text-center">
        <>{children}</>

        <div className="mt-6 flex justify-around items-center">
          <button
            className="btn-cancel w-[100px] rounded-full"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`btn-dark w-[100px] rounded-full ${
              disabled ? "opacity-30 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={typeof disabled === "boolean" && disabled}
            onClick={onConfirm}
          >
            {loading ? <ButtonLoader loading size={8} /> : "Confirm"}
          </button>
        </div>
        {error && (
          <div className="absolute left-0 right-0 bottom-2">
            <p className="error">Error message</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  )
}
