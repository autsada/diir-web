import React from "react"

import type { PublishCategory } from "@/graphql/types"

interface Props {
  category?: PublishCategory | "All"
  setCategory: (c: PublishCategory | "All") => void
  loading: boolean
}

export default function ContentTabs({ category, setCategory, loading }: Props) {
  return (
    <>
      <Tab
        text="All"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Music"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Movies"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Entertainment"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Sports"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Food"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Travel"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Gaming"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="News"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Animals"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Education"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Science"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Technology"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Programming"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="LifeStyle"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Vehicles"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Children"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Women"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Men"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
      <Tab
        text="Other"
        selected={category}
        setCategory={setCategory}
        loading={loading}
      />
    </>
  )
}

function Tab({
  text,
  setCategory,
  loading,
  selected,
}: {
  text: PublishCategory | "All"
  setCategory: (c: PublishCategory | "All") => void
  loading: boolean
  selected?: PublishCategory | "All"
}) {
  return (
    <button
      type="button"
      className={`btn-light px-5 h-8 rounded-full ${
        selected === text ? "bg-neutral-100" : ""
      }`}
      disabled={loading}
      onClick={setCategory.bind(undefined, text)}
    >
      {text}
    </button>
  )
}
