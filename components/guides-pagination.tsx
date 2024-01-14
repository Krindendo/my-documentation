"use client"

import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface GuidesPaginationProps {
  currentPage: number
  maximumPages: number
  perPage: number
  maximumLength: number
  className?: string
}

export function GuidesPagination({
  currentPage,
  maximumPages,
  perPage,
  maximumLength,
  className,
}: GuidesPaginationProps) {
  const minimumArtiklesOnPage = (currentPage - 1) * perPage + 1
  const probablyMaximumLength = (currentPage - 1) * perPage + perPage
  const maximumArtiklesOnPage =
    probablyMaximumLength > maximumLength
      ? maximumLength
      : probablyMaximumLength

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded bg-white px-4 py-3 dark:bg-transparent sm:px-6",
        className
      )}
    >
      <div className="hidden gap-4 sm:flex sm:w-full sm:items-center sm:justify-between">
        <p className="text-sm">
          Showing <span className="font-medium">{minimumArtiklesOnPage}</span>{" "}
          to <span className="font-medium">{maximumArtiklesOnPage}</span> of{" "}
          <span className="font-medium">{maximumLength}</span> results
        </p>
        <PaginationGroup
          currentPage={currentPage}
          maximumPages={maximumPages}
        />
      </div>
    </div>
  )
}

interface PaginationGroupProps {
  currentPage: number
  maximumPages: number
}

function PaginationGroup({ currentPage, maximumPages }: PaginationGroupProps) {
  if (maximumPages <= 1) {
    return null
  }
  return (
    <Pagination className="flex-1 justify-end">
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationFirst
              href={{
                pathname: "guides",
                query: { page: 0 },
              }}
            />
          </PaginationItem>
        ) : null}

        <PaginationItems
          currentPage={currentPage}
          maximumPages={maximumPages}
        />

        {currentPage < maximumPages ? (
          <PaginationItem>
            <PaginationLast
              href={{
                pathname: "guides",
                query: { page: maximumPages },
              }}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  )
}

interface listOfPagesNumberProps {
  currentPage: number
  maximumPages: number
}

function listOfPagesNumber({
  currentPage,
  maximumPages,
}: listOfPagesNumberProps) {
  /* 
    [1,2,3,4,5]

     |   
    [1,2,3,4,5]

       |
    [1,2,3,4,5]

         |         
    [1,2,3,4,5]

         |
    [2,3,4,5,6]
  */

  const pageNumber: string[] = []

  if (maximumPages <= 5) {
    for (let i = 1; i <= maximumPages; i++) {
      pageNumber.push(i.toString())
    }
    return pageNumber
  }

  if (currentPage === 1 || currentPage === 2) {
    for (let i = 1; i <= 5; i++) {
      pageNumber.push(i.toString())
    }
    return pageNumber
  }

  if (currentPage === maximumPages || currentPage === maximumPages - 1) {
    for (let i = maximumPages - 4; i <= maximumPages; i++) {
      pageNumber.push(i.toString())
    }
    return pageNumber
  }

  for (let i = -2; i <= 2; i++) {
    pageNumber.push((currentPage + i).toString())
  }
  return pageNumber
}

interface PaginationItemsProps {
  currentPage: number
  maximumPages: number
}

function PaginationItems({ currentPage, maximumPages }: PaginationItemsProps) {
  const listOfArticles = listOfPagesNumber({ currentPage, maximumPages })

  return listOfArticles.map((page) => {
    return (
      <PaginationItem key={`pagination_${page}`}>
        <PaginationLink
          isActive={currentPage.toString() === page}
          href={{ pathname: "guides", query: { page } }}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    )
  })
}
