import _ from "lodash"

// Transform seconds to hour format
export function secondsToHourFormat(sec: number) {
  const h = Math.floor(sec / 3600)
    .toString()
    .padStart(1, "0")
  const H = h === "0" ? "" : `${h}:`

  const m = Math.floor((sec % 3600) / 60)
    .toString()
    .padStart(2, "0")
  const M =
    m === "00" ? "0:" : m.startsWith("0") ? `${m.replace("0", "")}:` : `${m}:`

  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0")

  return `${H}${M}${s}`
}

export function formatDate(date: Date) {
  const usDateTime = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // hour12: true,
    // timeZone: 'America/Los_Angeles',
  })

  const [d1, d2, d3] = usDateTime.split(", ")

  const formattedUsDateTime = `${d1}, ${d2}`

  return formattedUsDateTime
}

export function getPostExcerpt(str: string, len = 100) {
  return _.truncate(str, { length: len, separator: /,?\.* +/ }) // separate by spaces, including preceding commas and periods
}
