"use client"

import React, { useCallback, useState } from "react"

import LeftDrawer from "./LeftDrawer"
import MainNav from "./MainNav"
import { getMyAccount } from "@/graphql"
import type { ValueType } from "@/types"
import AuthModal from "../auth/AuthModal"
import { useIdTokenChanged } from "@/hooks/useIdTokenChanged"
import SideBar from "./SideBar"

interface Props {
  accountData: ValueType<ReturnType<typeof getMyAccount>> | null
}

export default function AppLayoutClient({ accountData }: Props) {
  const [leftDrawerVisible, setLeftDrawerVisible] = useState(false)
  const [authModalVisible, setAuthModalVisible] = useState(false)

  const { idToken } = useIdTokenChanged()

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

  console.log("data: ", accountData)
  return (
    <>
      <div className="fixed z-0 top-0 left-0 right-0">
        <MainNav
          openLeftDrawer={openLeftDrawer}
          openAuthModal={openAuthModal}
        />
      </div>

      <div className="hidden w-[100px] fixed top-[70px] bottom-0 bg-white py-5 px-2 sm:block">
        <SideBar />
      </div>

      <LeftDrawer isOpen={leftDrawerVisible} closeDrawer={closeLeftDrawer} />

      {!idToken && (
        <AuthModal visible={authModalVisible} closeModal={closeAuthModal} />
      )}
    </>
  )
}
