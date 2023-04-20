import React from "react"
import Backdrop from "./Backdrop"

interface Props {
  visible: boolean
  children: React.ReactNode
  withBackdrop?: boolean
}

export default function ModalWrapper({
  visible,
  children,
  withBackdrop = true,
}: Props) {
  if (!visible) return null

  return (
    <>
      <div className="fixed z-50 inset-0 flex flex-col justify-center items-center">
        {children}
      </div>
      {withBackdrop && <Backdrop visible={visible} />}
    </>
  )
}
