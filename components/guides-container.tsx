"use client"

import * as React from "react"
import { Guide } from "@/.contentlayer/generated"

import { useDebounce } from "@/hooks/use-debounce"

import { getGuides, Guides } from "./guides-actions"
import { GuidesCard } from "./guides-card"
import { GuidesSearch } from "./guides-search"

//TODO: Napraviti filter za artikle, napraviti nesto slicno kao sto je na stranici https://vercel.com/templates

interface GuidesContainerProps {
  initGuides: Guides
}

export function GuidesContainer({ initGuides }: GuidesContainerProps) {
  const [search, setSearch] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [guides, setGuides] = React.useState<Guide[]>(initGuides.guides)

  const debouncedSearch = useDebounce(search)

  React.useEffect(() => {
    const searchGuide = async () => {
      setIsSearching(true)

      const data = await getGuides(0, debouncedSearch)

      setGuides(data.guides)

      setIsSearching(false)
    }

    searchGuide()
  }, [debouncedSearch])

  return (
    <>
      <GuidesSearch
        className="mb-4 mt-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {guides?.length ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {guides.map((guide) => (
            <GuidesCard key={guide._id} guide={guide} />
          ))}
        </div>
      ) : (
        <p>No guides published.</p>
      )}
    </>
  )
}
