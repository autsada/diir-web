"use client"

import React, { useCallback, useState } from "react"

import LeftDrawer from "./LeftDrawer"
import MainNav from "./MainNav"
import Backdrop from "../Backdrop"

export default function AppNav() {
  const [leftDrawerVisible, setLeftDrawerVisible] = useState(false)

  const openLeftDrawer = useCallback(() => {
    setLeftDrawerVisible(true)
  }, [])

  const closeLeftDrawer = useCallback(() => {
    setLeftDrawerVisible(false)
  }, [])

  return (
    <>
      <div className="fixed z-0 top-0 left-0 right-0">
        <MainNav openLeftDrawer={openLeftDrawer} />
      </div>
      <div className="hidden w-[100px] fixed top-[70px] bottom-0 sm:block bg-green-300">
        Sidebar
      </div>

      <LeftDrawer isOpen={leftDrawerVisible} closeDrawer={closeLeftDrawer} />

      <Backdrop visible={leftDrawerVisible} onClick={closeLeftDrawer} />
    </>
  )
}
