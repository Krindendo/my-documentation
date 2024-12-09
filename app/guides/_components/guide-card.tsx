import Link from "next/link";

import { formatDate } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { Guide } from "@/.content-collections/generated";

interface GuidesCardProps {
  title: Guide["title"];
  description: Guide["description"];
  date: Guide["publishedAt"];
  url: Guide["slugAsPath"];
}

export function GuideCard({ title, description, date, url }: GuidesCardProps) {
  return (
    <article className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {date && (
          <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
        )}
      </div>
      <Link href={url} className="absolute inset-0">
        <span className="sr-only">View</span>
      </Link>
    </article>
  );
}
export function GuideCardSkeleton() {
  return (
    <div className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-col justify-between space-y-4">
        <Skeleton className="h-[20px] w-3/4 rounded-full" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[17px] w-1/4" />
      </div>
    </div>
  );
}
