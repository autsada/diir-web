import React from "react"

export default function ContentTabs() {
  return (
    <>
      <Tab text="All" />
      <Tab text="Music" />
      <Tab text="Movies" />
      <Tab text="Entertainment" />
      <Tab text="Sports" />
      <Tab text="Food" />
      <Tab text="Travel" />
      <Tab text="Gaming" />
      <Tab text="News" />
      <Tab text="Animals" />
      <Tab text="Education" />
      <Tab text="Science" />
      <Tab text="Technology" />
      <Tab text="Programming" />
      <Tab text="LifeStyle" />
      <Tab text="Vehicles" />
      <Tab text="Children" />
      <Tab text="Women" />
      <Tab text="Men" />
      <Tab text="Other" />
    </>
  )
}

function Tab({ text }: { text: string }) {
  return <button className="btn-light px-5 h-8 rounded-full">{text}</button>
}
