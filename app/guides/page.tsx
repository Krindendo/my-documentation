import * as React from "react"
import { Metadata } from "next"

import { safeStringToInteger } from "@/lib/utils"
import { DocsPageHeader } from "@/components/docs-page-header"
import { getGuides } from "@/components/guides-actions"
import { GuidesList, GuidesListSkeleton } from "@/components/guides-list"
import { GuidesSearch } from "@/components/guides-search"
import { Pagination } from "@/components/pagination"

export const metadata: Metadata = {
  title: "Guides",
  description: "This section includes how to do stuff properly.",
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { search, page } = searchParams as { [key: string]: string }
  const guides = await getGuides(safeStringToInteger(page), search)

  return (
    <div className="py-6 lg:py-10">
      <DocsPageHeader
        heading="Guides"
        text="This section includes how to do stuff properly"
      />
      <GuidesSearch className="mb-4 mt-2" />

      {!guides?.guides.length ? (
        <p>No guides published.</p>
      ) : (
        <>
          <GuidesList guides={guides.guides} />
          <Pagination
            currentPage={guides.currentPage}
            maximumLength={guides.guidesLength}
            maximumPages={guides.maximumPages}
            perPage={guides.guidesPerPage}
          />
        </>
      )}
    </div>
  )
}
