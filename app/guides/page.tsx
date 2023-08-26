import { Metadata } from "next"

import { DocsPageHeader } from "@/components/docs-page-header"
import { guidesPreload } from "@/components/guides-actions"
import { GuidesContainer } from "@/components/guides-container"

export const metadata: Metadata = {
  title: "Guides",
  description: "This section includes how to do stuff properly.",
}

export default async function GuidesPage() {
  //await guidesPreload()
  return (
    <div className="py-6 lg:py-10">
      <DocsPageHeader
        heading="Guides"
        text="This section includes how to do stuff properly"
      />
      <GuidesContainer />
    </div>
  )
}
