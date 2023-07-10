import React, { useState, useCallback } from "react"
import { AiOutlineFlag, AiFillFlag } from "react-icons/ai"

import Reaction from "./Reaction"
import ReportModal from "@/app/(publishes)/ReportModal"

interface Props {
  title?: string
  publishId: string
  withDescription?: boolean
}

export default function ReportReaction({
  title,
  publishId,
  withDescription = true,
}: Props) {
  const [reportModalVisible, setReportModalVisible] = useState(false)

  const openReportModal = useCallback(() => {
    setReportModalVisible(true)
  }, [])

  const closeReportModal = useCallback(() => {
    setReportModalVisible(false)
  }, [])

  return (
    <>
      <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
        <Reaction
          IconOutline={AiOutlineFlag}
          IconFill={AiFillFlag}
          description="Report"
          withDescription={withDescription}
          isActive={false}
          onClick={openReportModal}
        />
      </div>

      {reportModalVisible && publishId && (
        <ReportModal
          title={title}
          publishId={publishId}
          closeModal={closeReportModal}
        />
      )}
    </>
  )
}
