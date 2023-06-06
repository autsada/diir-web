import React, { useState, useCallback } from "react"
import { AiOutlineFlag, AiFillFlag } from "react-icons/ai"

import Reaction from "./Reaction"
import ReportModal from "@/app/(publishes)/ReportModal"

interface Props {
  publishId: string
}

export default function ReportReaction({ publishId }: Props) {
  const [reportModalVisible, setReportModalVisible] = useState(false)

  const openReportModalVisible = useCallback(() => {
    setReportModalVisible(true)
  }, [])

  const closeReportModalVisible = useCallback(() => {
    setReportModalVisible(false)
  }, [])

  return (
    <>
      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          width={120}
          IconOutline={AiOutlineFlag}
          IconFill={AiFillFlag}
          desc="Report"
          isActive={false}
          onClick={openReportModalVisible}
        />
      </div>

      {reportModalVisible && publishId && (
        <ReportModal
          publishId={publishId}
          closeModal={closeReportModalVisible}
        />
      )}
    </>
  )
}
