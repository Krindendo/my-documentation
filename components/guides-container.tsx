"use client"

import * as React from "react"

import { useDebounce } from "@/hooks/use-debounce"

import { getGuides, Guides } from "./guides-actions"
import { GuidesList } from "./guides-list"
import { GuidesSearch } from "./guides-search"
import { Pagination } from "./pagination"

//TODO: Napraviti filter za artikle, napraviti nesto slicno kao sto je na stranici https://vercel.com/templates

interface GuidesContainerProps {
  initGuides?: Guides
}

export function GuidesContainer({ initGuides }: GuidesContainerProps) {
  const [search, setSearch] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [guides, setGuides] = React.useState<Guides>()

  const debouncedSearch = useDebounce(search)

  React.useEffect(() => {
    const searchGuide = async () => {
      setIsSearching(true)

      const data = await getGuides(0, debouncedSearch)

      setGuides(data)

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
      <GuidesList guides={guides?.guides} />
      <Pagination
        currentPage={1}
        perPage={10}
        maximumPages={10}
        maximumLength={97}
        className="mt-4"
      />
    </>
  )
}
