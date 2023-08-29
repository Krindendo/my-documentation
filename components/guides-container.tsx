import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { createUrl, safeStringToInteger } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"

import { getGuides, Guides, initGuides } from "./guides-actions"
import { GuidesList, GuidesListSkeleton } from "./guides-list"
import { GuidesSearch } from "./guides-search"
import { Pagination } from "./pagination"

//TODO: Na prvom pristupu aplikaciji potrebno je da odmah budu prikazani vodici, a da ne pise da nema vodice
//TODO: Napraviti filter za artikle, napraviti nesto slicno kao sto je na stranici https://vercel.com/templates

interface GuidesContainerProps {}

export function GuidesContainer({}: GuidesContainerProps) {
  // const searchParams = useSearchParams()
  // const currentPage = searchParams.get("page")
  // const searchOnPage = searchParams.get("search")
  //const [search, setSearch] = React.useState(searchOnPage ?? "")
  //const [isLoading, setIsLoading] = React.useState(false)
  //const [guides, setGuides] = React.useState<Guides | null>(null)
  //const router = useRouter()

  //const debouncedSearch = useDebounce(search)

  // const createQueryString = React.useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString())
  //     params.set(name, value)

  //     return params
  //   },
  //   [searchParams]
  // )

  // React.useEffect(() => {
  //   const searchGuide = async () => {
  //     setIsLoading(true)
  //     const data = await getGuides(
  //       safeStringToInteger(currentPage),
  //       debouncedSearch
  //     )
  //     setGuides(data)
  //     if (debouncedSearch) {
  //       router.push(
  //         createUrl("guides", createQueryString("search", debouncedSearch))
  //       )
  //     } else {
  //       router.push("guides")
  //     }

  //     setIsLoading(false)
  //   }

  //   searchGuide()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage, debouncedSearch])

  return (
    <>
      {/* <GuidesSearch
        className="mb-4 mt-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}

      <React.Suspense fallback={<GuidesListSkeleton />}>
        <GuidesList />
      </React.Suspense>

      {/* <Pagination
        currentPage={guides.currentPage}
        perPage={guides.guidesPerPage}
        maximumPages={guides.maximumPages}
        maximumLength={guides.guidesLength}
        className="mt-4"
      /> */}
    </>
  )
}

// https://github.com/vercel/app-playground/blob/main/app/streaming/node/product/%5Bid%5D/page.tsx

/*
      {isLoading ? (
        <GuidesListSkeleton />
      ) : (
        <GuidesList guides={guides.guides} />
      )}

*/
