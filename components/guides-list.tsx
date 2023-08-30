import { Guide } from "@/.contentlayer/generated"

import { GuidesCard, GuidesCardSkeleton } from "./guides-card"

interface GuidesListProps {
  guides: Guide[]
}

export async function GuidesList({ guides }: GuidesListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {guides.map((guide) => (
        <GuidesCard key={guide._id} guide={guide} />
      ))}
    </div>
  )
}

export function GuidesListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <GuidesCardSkeleton key={index} />
        ))}
    </div>
  )
}
