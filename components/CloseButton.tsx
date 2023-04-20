import React from "react"

interface Props {
  onClick: () => void
  className?: string
}

export default function CloseButton({ onClick, className }: Props) {
  return (
    <button
      type="submit"
      className={`text-xl text-textLight ${className || ""}`}
      onClick={onClick}
    >
      &#10005;
    </button>
  )
}
