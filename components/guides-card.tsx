import Link from "next/link"
import { Guide } from "@/.contentlayer/generated"

import { formatDate } from "@/lib/utils"

interface GuidesCardProps {
  guide: Guide
}

export function GuidesCard({ guide }: GuidesCardProps) {
  return (
    <article className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
      {guide.featured && (
        <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
          Featured
        </span>
      )}
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight">{guide.title}</h2>
          {guide.description && (
            <p className="text-muted-foreground">{guide.description}</p>
          )}
        </div>
        {guide.date && (
          <p className="text-sm text-muted-foreground">
            {formatDate(guide.date)}
          </p>
        )}
      </div>
      <Link href={guide.slug} className="absolute inset-0">
        <span className="sr-only">View</span>
      </Link>
    </article>
  )
}
export function GuidesCardSkeleton() {
  return <div></div>
}
