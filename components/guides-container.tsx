"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { safeStringToInteger } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"

import { getGuides, Guides, initGuides } from "./guides-actions"
import { GuidesList } from "./guides-list"
import { GuidesSearch } from "./guides-search"
import { Pagination } from "./pagination"

//TODO: Napraviti filter za artikle, napraviti nesto slicno kao sto je na stranici https://vercel.com/templates

interface GuidesContainerProps {}

export function GuidesContainer({}: GuidesContainerProps) {
  const [search, setSearch] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [guides, setGuides] = React.useState<Guides>(initGuides)
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page")

  const debouncedSearch = useDebounce(search)

  React.useEffect(() => {
    const searchGuide = async () => {
      setIsSearching(true)
      const data = await getGuides(
        safeStringToInteger(currentPage),
        debouncedSearch
      )
      setGuides(data)
      setIsSearching(false)
    }

    searchGuide()
  }, [currentPage, debouncedSearch])

  return (
    <>
      <GuidesSearch
        className="mb-4 mt-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <GuidesList guides={guides?.guides} />
      <Pagination
        currentPage={guides.currentPage}
        perPage={guides.guidesPerPage}
        maximumPages={guides.maximumPages}
        maximumLength={guides.guidesLength}
        className="mt-4"
      />
    </>
  )
}
