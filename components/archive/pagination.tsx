import * as React from "react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  maximumPages: number
  perPage: number
  maximumLength: number
  className?: string
}

function listOfPagesNumber({ maximumPages }: { maximumPages: number }) {
  // [1,2,3,...,6,7,8]

  const pageNumber: string[] = []
  for (let i = 1; i <= maximumPages; i++) {
    if (maximumPages > 7 && i > 3 && i < maximumPages - 2) {
      if (i === 4) {
        pageNumber.push("...")
      }
    } else {
      pageNumber.push(i.toString())
    }
  }

  return pageNumber
}

function Pagination({
  currentPage,
  maximumPages,
  perPage,
  maximumLength,
  className,
}: PaginationProps) {
  const minimumArtiklesOnPage = React.useMemo(
    () => (currentPage - 1) * perPage + 1,
    [currentPage, perPage]
  )

  const maximumArtiklesOnPage = React.useMemo(() => {
    const probablyMaximumLength = (currentPage - 1) * perPage + perPage

    return probablyMaximumLength > maximumLength
      ? maximumLength
      : probablyMaximumLength
  }, [maximumLength, currentPage, perPage])

  const listOfArticles = React.useMemo(
    () => listOfPagesNumber({ maximumPages }),
    [maximumPages]
  )

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded bg-white px-4 py-3 dark:bg-transparent sm:px-6",
        className
      )}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <div className="inline-flex items-center">
          {currentPage > 1 && (
            <Link
              href={{ pathname: "guides", query: { page: currentPage - 1 } }}
              className="relative w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-500"
            >
              Previous
            </Link>
          )}
        </div>
        <div className="inline-flex items-center">
          {currentPage < maximumPages && (
            <Link
              href={{ pathname: "guides", query: { page: currentPage + 1 } }}
              className="relative ml-3 w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Next
            </Link>
          )}
        </div>
      </div>
      <div className="hidden gap-4 sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing <span className="font-medium">{minimumArtiklesOnPage}</span>{" "}
            to <span className="font-medium">{maximumArtiklesOnPage}</span> of{" "}
            <span className="font-medium">{maximumLength}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px divide-x rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {currentPage > 1 ? (
              <Link
                href={{ pathname: "guides", query: { page: currentPage - 1 } }}
                className="relative inline-flex items-center rounded-l-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0 dark:border-gray-500"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-l-md bg-gray-200 p-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 dark:border-gray-500 dark:bg-gray-800">
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </span>
            )}

            {listOfArticles.map((item) => {
              if (item === "...") {
                return (
                  <span
                    key={`pagination_${item}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                )
              }
              return (
                <Link
                  key={`pagination_${item}`}
                  href={{ pathname: "guides", query: { page: item } }}
                  aria-current="page"
                  className={cn(
                    "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline",
                    currentPage.toString() === item
                      ? "border-y border-gray-300 bg-blue-500 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-900"
                      : "hidden text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:outline-offset-0 dark:text-white dark:hover:text-gray-900 md:inline-flex",
                    item === "..." && "text-gray-700 ring-gray-300"
                  )}
                >
                  {item}
                </Link>
              )
            })}
            {currentPage < maximumPages ? (
              <Link
                href={{ pathname: "guides", query: { page: currentPage + 1 } }}
                className="relative inline-flex items-center rounded-r-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-r-md bg-gray-200 p-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 dark:border-gray-500 dark:bg-gray-800">
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
