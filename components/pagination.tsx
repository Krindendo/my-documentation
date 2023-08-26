import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  maximumPages: number
  perPage: number
  maximumLength: number
  className?: string
}

function listOfPagesNumber() {
  // [1,2,3,...,6,7,8]

  return ["1", "2", "3", "...", "6", "7", "8"]
}

function howManyArticlesAreShown({
  currentPage,
  maximumPages,
  perPage,
  maximumLength,
}: {
  currentPage: number
  maximumPages: number
  perPage: number
  maximumLength: number
}) {
  // [10 or 97]

  if (currentPage === maximumPages) {
    return maximumLength
  }

  return currentPage * perPage
}

export function Pagination({
  currentPage,
  maximumPages,
  perPage,
  maximumLength,
  className,
}: PaginationProps) {
  const howManyArticles = React.useMemo(
    () =>
      howManyArticlesAreShown({
        currentPage,
        maximumPages,
        perPage,
        maximumLength,
      }),
    [currentPage, maximumPages, perPage, maximumLength]
  )

  const listOfArticles = React.useMemo(() => listOfPagesNumber(), [])

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded bg-white px-4 py-3 dark:bg-transparent sm:px-6",
        className
      )}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50  dark:border-gray-500"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium  hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm ">
            Showing <span className="font-medium">{currentPage}</span> to{" "}
            <span className="font-medium">{howManyArticles}</span> of{" "}
            <span className="font-medium">{maximumLength}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:border-gray-500"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>

            {listOfArticles.map((item) => (
              <a
                href="#"
                aria-current="page"
                className={cn(
                  "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline",
                  currentPage.toString() === item
                    ? "bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 dark:bg-orange-600"
                    : "hidden text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 md:inline-flex",
                  item === "..." && "text-gray-700 ring-gray-300"
                )}
              >
                {item}
              </a>
            ))}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
