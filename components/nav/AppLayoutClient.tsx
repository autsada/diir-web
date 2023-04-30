"use client"

import React, { useCallback, useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

import MainNav from "./MainNav"
import AuthModal from "../auth/AuthModal"
import LeftDrawer from "./LeftDrawer"
import RightDrawer from "./RightDrawer"
import SideBar from "./SideBar"
import { useIdTokenChanged } from "@/hooks/useIdTokenChanged"
import type { Account } from "@/graphql/types"

interface Props {
  account: Account | null
}

export default function AppLayoutClient({ account }: Props) {
  const [authModalVisible, setAuthModalVisible] = useState(false)
  const [leftDrawerVisible, setLeftDrawerVisible] = useState(false)
  const [rightDrawerVisible, setRightDrawerVisible] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { idToken } = useIdTokenChanged()

  // When idToken changed, refresh the route
  useEffect(() => {
    router.refresh()

    if (!idToken) {
      // Close right drawer when user signed out
      setRightDrawerVisible(false)
    } else {
      // Close auth modal when user signed in
      setAuthModalVisible(false)
    }
  }, [idToken, router])

  // Close drawers when navigate finished
  useEffect(() => {
    const url = pathname + searchParams.toString()

    // You can now use the current URL
    if (url) {
      setLeftDrawerVisible(false)
      setRightDrawerVisible(false)
    }
  }, [pathname, searchParams])

  const openAuthModal = useCallback(() => {
    setAuthModalVisible(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setAuthModalVisible(false)
  }, [])

  const openLeftDrawer = useCallback(() => {
    setLeftDrawerVisible(true)
  }, [])

  const closeLeftDrawer = useCallback(() => {
    setLeftDrawerVisible(false)
  }, [])

  const openRightDrawer = useCallback(() => {
    setRightDrawerVisible(true)
  }, [])

  const closeRightDrawer = useCallback(() => {
    setRightDrawerVisible(false)
  }, [])

  return (
    <>
      <div className="fixed z-0 top-0 left-0 right-0">
        <MainNav
          account={account}
          openAuthModal={openAuthModal}
          openLeftDrawer={openLeftDrawer}
          openRightDrawer={openRightDrawer}
        />
      </div>

      <div className="hidden w-[100px] fixed top-[70px] bottom-0 bg-white py-5 px-2 sm:block overflow-y-auto">
        <SideBar />
      </div>

      <LeftDrawer isOpen={leftDrawerVisible} closeDrawer={closeLeftDrawer} />
      <RightDrawer
        profile={account?.defaultStation}
        stations={account?.stations || []}
        isOpen={rightDrawerVisible}
        closeDrawer={closeRightDrawer}
      />

      <AuthModal visible={authModalVisible} closeModal={closeAuthModal} />
    </>
  )
}
