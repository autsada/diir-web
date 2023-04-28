import type { RecaptchaVerifier } from "firebase/auth"

import { getMyAccount } from "@/graphql"
import { NexusGenObjects } from "@/graphql/typegen"

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
    grecaptcha: any
    widgetId: number
  }
}

window.recaptchaVerifier = window.recaptchaVerifier || {}

export type FileWithPrview = File & {
  path: string
  preview: string
}

export type ValueType<T> = T extends Promise<infer U> ? U : T
export type Account = NexusGenObjects["Account"] & {
  stations: NexusGenObjects["Station"][]
}
