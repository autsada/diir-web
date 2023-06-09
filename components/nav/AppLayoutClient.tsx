"use client"

import React, { useCallback, useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import MainNav from "./MainNav"
import AuthModal from "../auth/AuthModal"
import RightDrawer from "./RightDrawer"
import CreateStationModal from "@/app/(non-watch)/(protect-routes)/settings/CreateStationModal"
import { useAuthContext } from "@/context/AuthContext"
import { useIdTokenChanged } from "@/hooks/useIdTokenChanged"
import type { Account } from "@/graphql/codegen/graphql"
import BottomTabs from "./BottomTabs"

interface Props {
  account: Account | null
  isAuthenticated: boolean // True when account is not null
  isNoStation: boolean // Authenticated and doesn't have a station yet
}

export default function AppLayoutClient({
  account,
  isAuthenticated,
  isNoStation,
}: Props) {
  const [rightDrawerVisible, setRightDrawerVisible] = useState(false)
  const [createStationModalVisible, setCreateStationModalVisible] =
    useState<boolean>()

  const { visible: authModalVisible, offVisible, headerText } = useAuthContext()

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
    }
    // else {
    //   // Close auth modal when user signed in
    //   setAuthModalVisible(false)
    // }
  }, [idToken, router])

  // Close auth modal when user is authenticated (account not null)
  useEffect(() => {
    if (isAuthenticated && authModalVisible) {
      offVisible()
    }
  }, [isAuthenticated, authModalVisible, offVisible])

  // Close drawers when navigate finished
  useEffect(() => {
    const url = pathname + searchParams.toString()

    // You can now use the current URL
    if (url) {
      setRightDrawerVisible(false)
    }
  }, [pathname, searchParams])

  // Show create station modal if user is authenticated and doesn't have a station yet
  useEffect(() => {
    if (isNoStation) {
      setCreateStationModalVisible(true)
    }
  }, [isNoStation])

  const openRightDrawer = useCallback(() => {
    setRightDrawerVisible(true)
  }, [])

  const closeRightDrawer = useCallback(() => {
    setRightDrawerVisible(false)
  }, [])

  const closeCreateStationModal = useCallback(() => {
    setCreateStationModalVisible(false)
  }, [])

  return (
    <>
      <div className="fixed z-20 top-0 left-0 right-0">
        <MainNav account={account} openRightDrawer={openRightDrawer} />
      </div>

      <RightDrawer
        profile={account?.defaultStation}
        stations={account?.stations || []}
        isOpen={rightDrawerVisible}
        closeDrawer={closeRightDrawer}
      />

      <AuthModal
        visible={authModalVisible}
        closeModal={offVisible}
        headerText={headerText}
      />

      {createStationModalVisible && account && (
        <CreateStationModal
          account={account!}
          closeModal={closeCreateStationModal}
          title="Create Station"
          additionalInfo="You will need a station to start upload, like, comment, follow, or add publishes to library."
          useDoItLaterClose={true}
          doItLaterText="I will do it later"
        />
      )}

      {/* Toast */}
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        icon={false}
      />

      <div className="sm:hidden fixed z-20 bottom-0 left-0 right-0">
        <BottomTabs isAuthenticated={isAuthenticated} />
      </div>
    </>
  )
}
