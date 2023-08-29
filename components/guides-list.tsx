import { Guide } from "@/.contentlayer/generated"

import { getGuides } from "./guides-actions"
import { GuidesCard, GuidesCardSkeleton } from "./guides-card"

interface GuidesListProps {
  guides?: Guide[]
}

export async function GuidesList({ guides }: GuidesListProps) {
  const data = await getGuides(0, "")

  if (!data?.guides) {
    return <></>
  }

  if (!data.guides.length) {
    return <p>No guides published.</p>
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {data.guides.map((guide) => (
        <GuidesCard key={guide._id} guide={guide} />
      ))}
    </div>
  )
}

export function GuidesListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      <GuidesCardSkeleton />
      <GuidesCardSkeleton />
      <GuidesCardSkeleton />
      <GuidesCardSkeleton />
    </div>
  )
}
