import React from "react"

interface Props {
  sectionName: string
}

export default function SectionHeader({ sectionName }: Props) {
  return (
    <h6 className="text-base sm:text-lg lg:text-xl">
      Settings <>&gt;</>{" "}
      <span className="text-sm sm:text-base lg:text-lg">{sectionName}</span>
    </h6>
  )
}
