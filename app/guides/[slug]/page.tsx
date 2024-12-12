import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx";
import { PageHeader } from "@/components/page-header";
import { TableOfContents } from "@/components/table-of-contents";
import { buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { allGuides } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type GuidePageProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GuidePageProperties): Promise<Metadata> => {
  const path = (await params).slug;
  const page = allGuides.find(({ slugAsPath }) => slugAsPath === path);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
  });
};

export default async function GuidePage({ params }: GuidePageProperties) {
  const path = (await params).slug || "";
  const page = allGuides.find(({ slugAsPath }) => slugAsPath === path);

  if (!page) {
    notFound();
  }

  return (
    <div className="container max-w-7xl">
      <div className="w-full py-16">
        <PageHeader
          heading={page.title}
          text={page.description}
          className="sm:w-9/12"
        />
        <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
          <div className="sm:flex-1">
            <Mdx code={page.body} />
            <div className="flex justify-center py-6 lg:py-10">
              <Link
                href="/guides"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                See all guides
              </Link>
            </div>
          </div>
          <div className="sticky top-24 hidden shrink-0 md:block">
            <TableOfContents content={page.content} date={page.publishedAt} />
          </div>
        </div>
      </div>
    </div>
  );
}
