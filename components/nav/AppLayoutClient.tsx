"use client"

import React, { useCallback, useState } from "react"

import LeftDrawer from "./LeftDrawer"
import MainNav from "./MainNav"
import { getMyAccount } from "@/graphql"
import type { ValueType } from "@/types"
import AuthModal from "../auth/AuthModal"

interface Props {
  accountData: ValueType<ReturnType<typeof getMyAccount>> | null
}

export default function AppLayoutClient({ accountData }: Props) {
  const [leftDrawerVisible, setLeftDrawerVisible] = useState(false)
  const [authModalVisible, setAuthModalVisible] = useState(false)

  const openLeftDrawer = useCallback(() => {
    setLeftDrawerVisible(true)
  }, [])

  const closeLeftDrawer = useCallback(() => {
    setLeftDrawerVisible(false)
  }, [])

  const openAuthModal = useCallback(() => {
    setAuthModalVisible(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setAuthModalVisible(false)
  }, [])

  return (
    <>
      <div className="fixed z-0 top-0 left-0 right-0">
        <MainNav
          openLeftDrawer={openLeftDrawer}
          openAuthModal={openAuthModal}
        />
      </div>
      <div className="hidden w-[100px] fixed top-[70px] bottom-0 sm:block bg-green-300">
        Sidebar
      </div>

      <LeftDrawer isOpen={leftDrawerVisible} closeDrawer={closeLeftDrawer} />

      <AuthModal visible={authModalVisible} closeModal={closeAuthModal} />
    </>
  )
}