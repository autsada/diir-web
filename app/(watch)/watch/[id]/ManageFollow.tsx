"use client"

import React, { useState, useCallback, useTransition, useMemo } from "react"
import Link from "next/link"
import _ from "lodash"

import ConfirmModal from "@/components/ConfirmModal"
import { useAuthContext } from "@/context/AuthContext"
import { followStation } from "@/app/(non-watch)/(station)/[station]/actions"
import type { Station } from "@/graphql/codegen/graphql"

interface Props {
  isAuthenticated: boolean
  follow: Station
  ownerHref: string
  ownerLinkText: string
}

export default function ManageFollow({
  isAuthenticated,
  follow,
  ownerHref,
  ownerLinkText,
}: Props) {
  const isOwner = follow?.isOwner
  const followerId = follow?.id
  const followerName = follow?.name
  const isFollowing = !!follow?.isFollowing
  const [prevFollowingStatus, setPrevFollowingStatus] = useState(isFollowing)
  const [optimisticFollowing, setOptimisticFollowing] = useState(isFollowing)

  // When following status changed
  if (isFollowing !== prevFollowingStatus) {
    // Update the displayed following status (optimisticFollowing)
    setOptimisticFollowing(isFollowing)
    setPrevFollowingStatus(isFollowing)
  }

  const { onVisible: openAuthModal } = useAuthContext()
  const [isPending, startTransition] = useTransition()

  const [followingText, setFollowingText] = useState<"Following" | "Unfollow">(
    "Following"
  )
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

  const handleFollow = useCallback(() => {
    if (!followerId) return

    if (!isAuthenticated) {
      openAuthModal()
    } else {
      setOptimisticFollowing(!isFollowing)

      startTransition(() => followStation(followerId))
      if (confirmModalVisible) setConfirmModalVisible(false)
    }
  }, [
    isAuthenticated,
    openAuthModal,
    followerId,
    isFollowing,
    confirmModalVisible,
  ])

  const followDebounce = useMemo(
    () => _.debounce(handleFollow, 200),
    [handleFollow]
  )

  const onMouseOverFollowing = useCallback(() => {
    setFollowingText("Unfollow")
  }, [])

  const onMouseLeaveFollowing = useCallback(() => {
    setFollowingText("Following")
  }, [])

  const openConfirmModal = useCallback(() => {
    setConfirmModalVisible(true)
  }, [])

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false)
  }, [])

  if (!follow) return null

  return (
    <>
      {isOwner ? (
        <Link href={ownerHref}>
          <button className="btn-orange text-sm sm:text-base px-5 rounded-full">
            {ownerLinkText}
          </button>
        </Link>
      ) : optimisticFollowing ? (
        <button
          type="button"
          className={`btn-blue text-sm sm:text-base mx-0 w-[100px] sm:w-[110px] rounded-full ${
            followingText === "Following"
              ? "text-white bg-blueBase"
              : "text-red-500 bg-blueLighter hover:bg-blueLighter"
          }`}
          onClick={openConfirmModal}
          onMouseOver={onMouseOverFollowing}
          onMouseLeave={onMouseLeaveFollowing}
        >
          {followingText}
        </button>
      ) : (
        <button
          type="button"
          className="btn-dark mx-0 text-sm sm:text-base w-[100px] sm:w-[110px] rounded-full"
          onClick={followDebounce}
        >
          Follow
        </button>
      )}

      {confirmModalVisible && (
        <ConfirmModal onCancel={closeConfirmModal} onConfirm={followDebounce}>
          <div className="mb-8">
            <h5>
              Unfollow <span className="text-blueBase">@{followerName}</span>?
            </h5>
          </div>
        </ConfirmModal>
      )}
    </>
  )
}
