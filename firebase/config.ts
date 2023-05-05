import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCsRsWjtOFyiDhsa-2xfVi11_gj1zqgpR8",
  authDomain: "diir-e7ee3.firebaseapp.com",
  projectId: "diir-e7ee3",
  storageBucket: "diir-e7ee3.appspot.com",
  messagingSenderId: "767876936463",
  appId: "1:767876936463:web:60e8f3cde5b22d9e33847a",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)
firebaseAuth.useDeviceLanguage()
export const storage = getStorage(app)

export const stationFolder = "stations"
