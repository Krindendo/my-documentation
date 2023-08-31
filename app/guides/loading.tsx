import { DocsPageHeader } from "@/components/docs-page-header"
import { GuidesListSkeleton } from "@/components/guides-list"

export default function Loading() {
  return (
    <div className="py-6 lg:py-10">
      <DocsPageHeader
        heading="Guides"
        text="This section includes how to do stuff properly"
      />
      <div className="relative">
        <div className="mb-4 mt-2 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm  ring-offset-background">
          <p className="cursor-default text-muted-foreground">
            Search for guides
          </p>
        </div>
      </div>
      <GuidesListSkeleton />
    </div>
  )
}
