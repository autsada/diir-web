import React, { useCallback } from "react"
import { AiOutlineFolderAdd, AiFillFolderAdd } from "react-icons/ai"

import Reaction from "./ReactTion"
import { useAuthContext } from "@/context/AuthContext"

interface Props {
  isAuthenticated: boolean
  publishId: string
}

export default function SaveReaction({ isAuthenticated, publishId }: Props) {
  const { onVisible: openAuthModal } = useAuthContext()

  const handleSavePublish = useCallback(() => {
    if (!publishId) return

    if (!isAuthenticated) {
      openAuthModal()
    }
  }, [publishId, isAuthenticated, openAuthModal])

  return (
    <div className="h-[40px] flex items-center rounded-full overflow-hidden divide-x bg-gray-100">
      <Reaction
        width={100}
        IconOutline={AiOutlineFolderAdd}
        IconFill={AiFillFolderAdd}
        desc="Save"
        isActive={false}
        onClick={handleSavePublish}
      />
    </div>
  )
}
