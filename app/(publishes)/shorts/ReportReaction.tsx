import React from "react"
import { AiOutlineFlag, AiFillFlag } from "react-icons/ai"

import Reaction from "@/app/(watch)/watch/[id]/Reaction"

interface Props {
  openReportModal: () => void
}

export default function ReportReaction({ openReportModal }: Props) {
  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        IconOutline={AiOutlineFlag}
        IconFill={AiFillFlag}
        description="Report"
        withDescription={false}
        isActive={false}
        onClick={openReportModal}
      />
    </div>
  )
}
