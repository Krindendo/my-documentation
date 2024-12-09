import { Guide } from "@/.content-collections/generated";
import { GuideCard, GuideCardSkeleton } from "./guide-card";

interface GuidesListProps {
  guides: Guide[];
}

export async function GuideList({ guides }: GuidesListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {guides.map((guide) => (
        <GuideCard
          key={guide._meta.filePath}
          title={guide.title}
          description={guide.description}
          date={guide.publishedAt}
          url={guide.slugAsPath}
        />
      ))}
    </div>
  );
}

export function GuideListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <GuideCardSkeleton key={index} />
        ))}
    </div>
  );
}
