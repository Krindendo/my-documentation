import { Guide } from "@/.contentlayer/generated"

import { GuidesCard } from "./guides-card"

interface GuidesListProps {
  guides?: Guide[]
}

export function GuidesList({ guides }: GuidesListProps) {
  if (!guides?.length) {
    return <p>No guides published.</p>
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {guides.map((guide) => (
        <GuidesCard key={guide._id} guide={guide} />
      ))}
    </div>
  )
}
