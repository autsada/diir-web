import React from "react"

interface Props {
  visible: boolean
  onClick?: () => void
}

export default function Backdrop({ visible = false, onClick }: Props) {
  return (
    <div
      className={`fixed z-40 bg-black ${
        visible ? "inset-0 opacity-30 visible" : "hidden"
      } transition-all duration-300`}
      onClick={onClick}
    />
  )
}
