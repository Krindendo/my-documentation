import type { FC } from 'react';
import Link from 'next/link';

import { FormattedTime } from '@/components/Common/FormattedTime';
import { Skeleton } from '@/components/ui/skeleton';

type GuidePostCardProps = {
  title: string;
  category: string;
  description: string;
  date: Date;
  slug: string;
  featured?: boolean;
};

export const GuidePostCard: FC<GuidePostCardProps> = ({
  title,
  slug,
  category,
  description,
  date,
  featured,
}) => {
  return (
    <article className="relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
      {featured && (
        <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
          Featured
        </span>
      )}
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-medium tracking-tight">{title}</h2>
          <p className=" text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <FormattedTime
            className="text-sm text-muted-foreground"
            date={date}
          />
          {category && category !== 'uncategorized' && (
            <p className="!mt-0 text-muted-foreground">{category}</p>
          )}
        </div>
      </div>
      <Link href={slug} className="absolute inset-0" prefetch={true}>
        <span className="sr-only">View</span>
      </Link>
    </article>
  );
};

export function GuidesCardSkeleton() {
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
