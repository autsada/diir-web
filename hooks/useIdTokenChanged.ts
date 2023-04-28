import { useEffect, useState } from "react"
import { setCookie, deleteCookie } from "cookies-next"
import type { Unsubscribe } from "firebase/auth"

import { firebaseAuth } from "@/firebase/config"

// TODO: For users that use their own wallet, sign a message and send to the server to verify in order to authenticate user.
export function useIdTokenChanged(signature?: string, message?: string) {
  const [idToken, setIdToken] = useState<string>()

  // When id token changed
  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined = undefined

    if (signature) {
      unsubscribe = firebaseAuth.onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken()
          setIdToken(token)
          setCookie("dtoken", `${token}  :::${signature} ${message}`)
        } else {
          setIdToken(undefined)
        }
      })
    } else {
      unsubscribe = firebaseAuth.onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken()
          setIdToken(token)
          setCookie("dtoken", token)
        } else {
          setIdToken(undefined)
          deleteCookie("dtoken")
        }
      })
    }

    return unsubscribe
  }, [signature, message])

  return { idToken }
}
