import { getCountries } from "react-phone-number-input/input"
import en from "react-phone-number-input/locale/en.json"

export function getCountryNames() {
  return getCountries()
    .map((c) => ({ code: c, name: en[c] }))
    .sort((c1, c2) => {
      const c1Name = c1.name.toLowerCase()
      const c2Name = c2.name.toLowerCase()

      return c1Name > c2Name ? 1 : c1Name < c2Name ? -1 : 0
    })
}

/**
 * A helper function to wait
 * @param time milliseconds
 */
export function wait(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const contentCategories = [
  "Music",
  "Movies",
  "Entertainment",
  "Sports",
  "Food",
  "Travel",
  "Gaming",
  "News",
  "Animals",
  "Education",
  "Science",
  "Technology",
  "Programming",
  "AI",
  "LifeStyle",
  "Vehicles",
  "Children",
  "Women",
  "Men",
  "Other",
] as const

export const publishKinds = ["videos", "blogs", "podcasts", "ads"] as const
