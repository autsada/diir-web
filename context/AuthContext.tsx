"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

interface AuthContextState {
  visible: boolean
  onVisible: () => void
  offVisible: () => void
}

const AuthContext = createContext<AuthContextState | undefined>(undefined)

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [authModalVisible, setAuthModalVisible] = useState(false)

  const onVisible = useCallback(() => {
    setAuthModalVisible(true)
  }, [])

  const offVisible = useCallback(() => {
    setAuthModalVisible(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{ visible: authModalVisible, onVisible, offVisible }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === undefined)
    throw new Error("useAuthContext must be used within ContextProvider.")

  return context
}
