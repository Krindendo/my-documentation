"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { cn, createUrl } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"

import { Input, InputProps } from "./ui/input"

interface GuidesSearch extends InputProps {}

export function GuidesSearch({ className, ...props }: GuidesSearch) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = React.useState(
    searchParams?.get("search") || ""
  )

  // React.useEffect(() => {
  //   setSearchValue(searchParams?.get("search") || "")
  // }, [searchParams, setSearchValue])

  const debouncedSearch = useDebounce(searchValue)

  React.useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      newParams.set("search", debouncedSearch)
    } else {
      newParams.delete("search")
    }

    router.push(createUrl("/guides", newParams))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <div className={cn(className)}>
      <Input
        type="text"
        name="search"
        placeholder="Search for guides"
        className=""
        autoComplete="off"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        {...props}
      />
    </div>
  )
}
