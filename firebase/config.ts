import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

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
export const db = getFirestore(app)

export const stationsFolder = "stations"
export const publishesFolder = "publishes"
export const uploadsCollection = "uploads"
export const publishesCollection = "publishes"
