"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { createUrl, safeStringToInteger } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"

import { getGuides, Guides, initGuides } from "./guides-actions"
import { GuidesList } from "./guides-list"
import { GuidesSearch } from "./guides-search"
import { Pagination } from "./pagination"

//TODO: Napraviti filter za artikle, napraviti nesto slicno kao sto je na stranici https://vercel.com/templates

interface GuidesContainerProps {}

export function GuidesContainer({}: GuidesContainerProps) {
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page")
  const searchOnPage = searchParams.get("search")
  const [search, setSearch] = React.useState(searchOnPage ?? "")
  const [isSearching, setIsSearching] = React.useState(false)
  const [guides, setGuides] = React.useState<Guides>(initGuides)
  const router = useRouter()

  const debouncedSearch = useDebounce(search)

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params
    },
    [searchParams]
  )

  React.useEffect(() => {
    const searchGuide = async () => {
      setIsSearching(true)
      const data = await getGuides(
        safeStringToInteger(currentPage),
        debouncedSearch
      )
      setGuides(data)
      if (debouncedSearch) {
        router.push(
          createUrl("guides", createQueryString("search", debouncedSearch))
        )
      }

      setIsSearching(false)
    }

    searchGuide()
  }, [createQueryString, currentPage, debouncedSearch])

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
