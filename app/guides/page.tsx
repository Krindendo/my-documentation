import * as React from "react";
import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { GuideList } from "./_components/guide-list";
import { GuidePagination } from "./_components/guide-pagination";
import { safeStringToInteger } from "@/lib/utils";
import { getSearchResults } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Guides",
  description: "This section includes how to do stuff properly.",
};

type SearchParams = Promise<{ search: string; page: string }>;

export default async function GuidesPage(props: {
  searchParams: SearchParams;
}) {
  const { search, page } = await props.searchParams;
  const guides = await getSearchResults(search, safeStringToInteger(page));

  return (
    <div className="py-6 lg:py-10 container max-w-5xl">
      <PageHeader
        heading="Guides"
        text="This section includes how to do stuff properly"
      />

      {!guides?.guides.length ? (
        <p>No guides published.</p>
      ) : (
        <>
          <GuideList guides={guides.guides} />
          <GuidePagination
            currentPage={guides.currentPage}
            maximumLength={guides.guidesLength}
            maximumPages={guides.maximumPages}
            perPage={guides.guidesPerPage}
          />
        </>
      )}
    </div>
  );
}
