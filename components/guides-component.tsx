"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { createUrl } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"

import { GuidesListSkeleton } from "./guides-list"
import { GuidesSearch } from "./guides-search"

interface GuidesComponentProps {
  children: React.ReactNode
}

export function GuidesComponent({ children }: GuidesComponentProps) {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = React.useState(
    searchParams?.get("search") || ""
  )
  const [isPending, startTransition] = React.useTransition()

  const debouncedSearch = useDebounce(searchValue)

  React.useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      newParams.set("search", debouncedSearch)
    } else {
      newParams.delete("search")
    }

    startTransition(() => {
      replace(createUrl("/guides", newParams))
    })
  }, [debouncedSearch, replace, searchParams])

  return (
    <>
      <GuidesSearch
        className="mb-4 mt-2"
        autoComplete="off"
        isPending={isPending}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {isPending ? <GuidesListSkeleton /> : children}
    </>
  )
}
